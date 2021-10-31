const path = require('path')
const fs = require('fs')

function resolvePath(...resolve) {
  return path.resolve.call(null, __dirname, ...resolve)
}

class ReadFile {
  constructor(dirPath = 'mdfile', fileType = 'md', current = 1, pageSize = 2, recursionFlag = false, fileFlag = true) {
    // 需要加载static文件夹下的文件路径中间名称
    this.resolvePath = resolvePath(`./${dirPath}`)
    // 加载的文件类型
    this.fileType = fileType
    // 需要加载文件和文件名称
    this.fileObj = {}

    // 是否开启递归读取md文件
    this.recursionFlag = recursionFlag

    // 缓存分页后的数组达到优化性能
    this.PageSize = pageSize

    // 是否只获取文件夹文件
    this.fileFlag = fileFlag

    // 所有文件夹列表
    this.allfileList = []

    this.pageData = []
  }

  initAllfileListArray() {
    let newArray = []
    const copyFileList = JSON.parse(JSON.stringify(this.allfileList))
    try {
      if (copyFileList.length > 0) {
        for (let i = 0, l = copyFileList.length; i < l; i += this.PageSize) {
          newArray.push(copyFileList.slice(i, i + this.PageSize))
        }
      }
    } catch (error) {
      console.log(error)
    }
    return newArray
  }

  // 读取文件夹
  readdir(path) {
    return fs.promises.readdir(path)
  }

  // 读取文件
  readfile(path) {
    return fs.promises.readFile(path, 'utf-8')
  }

  // 读取文件列表
  async readdirList() {
    const dirList = [];
    const res = await this.readdir(this.resolvePath);
    console.log(res);
    return dirList
  }

  async recursion(dirList, filePath, preDir) {
    const filelist = []
    let stat
    for (let i = 0, l = dirList.length; i < l; i += 1) {
      const pathName = filePath ? `${filePath}/${dirList[i]}` : dirList[i] // 当前读到的pathname
      const rp = resolvePath(`${this.resolvePath}/${pathName}`) // 读取文件地址

      stat = fs.lstatSync(rp)

      // 如果是文件夹
      if (stat.isDirectory()) {
        // 如果不开启递归查询文件那么会自动过掉子文件夹
        if (preDir && !this.recursionFlag) {
          continue
        }

        const list = await this.readdir(rp)
        if (list.length === 0 || !list) {
          this.fileObj[dirList[i]] = {
            dirContent: [],
            children: {},
          }
          return filelist
        }
        if (preDir) {
          const yinyong = {
            dirContent: [],
            children: {},
          }
          preDir.children = {
            [dirList[i]]: yinyong,
          }
          yinyong.dirContent = await this.recursion(list, pathName, yinyong)
        } else {
          // 如果不开启递归查询文件那么会自动过掉子文件夹
          if (!this.recursionFlag) {
            this.fileObj[dirList[i]] = {
              dirContent: [],
            }
          } else {
            this.fileObj[dirList[i]] = {
              children: {},
              dirContent: [],
            }
          }
          this.fileObj[dirList[i]].dirContent = await this.recursion(list, pathName, this.fileObj[dirList[i]])
        }
      } else {
        const file = await this.readfile(rp)
        const label = filePath.split('/') // 标签
        filelist.push({
          filename: path.basename(dirList[i], `.${this.fileType}`),
          ext: this.fileType,
          text: file,
          createTime: stat.ctime,
          modifyTime: stat.mtime,
          label: label,
        })
        // 所有文件列表
        this.allfileList.push({
          filename: path.basename(dirList[i], `.${this.fileType}`),
          ext: this.fileType,
          text: file,
          createTime: stat.ctime,
          modifyTime: stat.mtime,
          label: label,
        })
      }
    }
    // 初始化分页数据
    this.pageData = this.initAllfileListArray(this.allfileList)
    // console.log(this.allfileList)
    return filelist
  }

  // 递归判断读取是文件夹还是文件循环读取
  async readAllFile() {
    const dirList = await this.readdir(this.resolvePath)
    await this.recursion(dirList)
    return this.fileObj
  }

  // 获取对应当前页数据
  getPageData(current) {
    console.log()
    return this.pageData[current]
  }
}

async function getMdFile(path, current) {
  // const readFilePath = resolvePath(`./${path}`)
  const ReadMdFile = new ReadFile(path)
  // return ReadMdFile.readAllFile()
  await ReadMdFile.readAllFile()
  const pageData = ReadMdFile.getPageData(current - 1)
  const result = {
    pageData: pageData,
    total: ReadMdFile.allfileList.length,
    current: current,
  }
  return result
}

async function getTags(path) {
  const ReadMdFile = new ReadFile(path)
  return ReadMdFile.readdirList()
}

// function ReadMdFile() {
//   return new Promise((resolve, reject) => {
//     const mdData = []
//     fs.readdir(readFilePath, (err, file) => {
//       if (err) {
//         reject(err)
//       } else {
//         console.log(file);
//         for (let i = 0, l = file.length; i < l; i += 1) {
//           fs.readFile(resolvePath(`${readFilePath}/${file[i]}`), 'utf-8', (err, data) => {
//             if (err) {
//               reject(err)
//             } else {
//               mdData.push({
//                 filename: path.basename(file[i], '.md'),
//                 text: data
//               })
//               if (mdData.length === file.length) {
//                 resolve(mdData)
//               }
//             }
//           })
//         }
//       }
//     })
//   })
// }

module.exports = { getMdFile, getTags }
