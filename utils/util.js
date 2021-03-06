let md5 = require('md5.js')
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
let app_id = '2111343989'//自己的appid
let app_key = 'siMUule8UF2EOK6E';//自己的appkey
//对参数进行排序MD5计算
let _genRequestSign = (params) => {
  // 1. 对请求参数按字典升序排序
  params = _sortObject(params)
  // 2. 拼接键值对，value部分进行URL编码
  let paramStr = ''
  let keys = Object.keys(params)
  for (let idx in keys) {
    let key = keys[idx]
    paramStr += key + '=' + encodeURIComponent(params[key]) + '&'
  }
  // 3. 拼接key
  paramStr += 'app_key=' + app_key
  // 4. md5
  return md5.hexMD5(paramStr).toUpperCase()
}
//对KEY进行排序
let _sortObject = (obj) => {
  var keys = Object.keys(obj).sort()
  var newObj = {}
  for (var i = 0; i < keys.length; i++) {
    newObj[keys[i]] = obj[keys[i]]
  }
  return newObj
}

const ajax = (type, url, params, callback) => {
  wx.showLoading({
    title: '处理中...',
    mask: true
  })
  wx.request({
    url: url,
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: type,
    success: function (res) {
      callback.success(res.data)
    },
    fail: function (res) {
      if (callback.fail)
        callback.fail()
    }
  })
}
const getAjax = (url, params, callback)=> {
  ajax('GET', url, params, callback)
}
const postAjax = (url, params, callback) => {
  ajax('POST', url, params, callback)
}
const filterImgae = ['原图', '岩井', '粉嫩', '错觉', '暖阳', '浪漫', '蔷薇', '睡莲', '糖果玫瑰', '新叶', '尤加利', '墨', '玫瑰初雪', '樱桃布丁', '白茶', '甜薄荷', '樱红', '圣代', '莫斯科', '冲绳', '粉碧', '地中海', '佛罗伦萨', '札幌', '栀子', '东京', '昭和', '自然', '清逸', '染', '甜美',];
const beautyImage = ['原图','芭比粉', '清透', '烟灰', '自然', '樱花粉', '原宿红', '闪亮', '粉紫', '粉嫩', '自然', '清透', '大地色', '自然', '清透', '桃粉', '橘粉', '春夏', '秋冬', '经典复古', '性感混血', '炫彩明眸', '紫色魅惑', ];
const changeImage = ['原图','埃及妆', '巴西土著妆', '灰姑娘妆', '恶魔妆', '武媚娘妆', '星光薰衣草', '花千骨', '僵尸妆', '爱国妆', '小胡子妆', '美羊羊妆', '火影鸣人妆', '刀马旦妆', '泡泡妆', '桃花妆', '女皇妆', '权志龙', '撩妹妆', '印第安妆', '印度妆', '萌兔妆', '大圣妆'];
const purikuraImage = ['原图', 'NewDay', '欢乐球吃球1', 'Bonvoyage', 'Enjoy', 'ChickenSpring', 'ChristmasShow', 'ChristmasSnow', 'CircleCat', 'CircleMouse', 'CirclePig', 'Comicmn', 'CuteBaby', 'Envolope', 'Fairytale', 'GoodNight', 'HalloweenNight', 'LovelyDay', 'Newyear2017', 'PinkSunny', 'KIRAKIRA', '欢乐球吃球2', 'SnowWhite', 'SuperStar', 'WonderfulWork', 'Cold', '狼人杀守卫', '狼人杀猎人', '狼人杀预言家', '狼人杀村民', '狼人杀女巫', '狼人杀狼人'];
const sceneConfig = {
  0: '机场',
  1: '机舱',
  2: '机场航站楼',
  3: '胡同',
  4: '游乐场',
  5: '游乐园',
  6: '公寓大楼外',
  7: '水族馆',
  8: '渡槽',
  9: '游乐中心',
  10: '考古发掘',
  11: '档案文件',
  12: '曲棍球',
  13: '性能', 
  14: '牛仔竞技比赛',
  15: '陆军基地',
  16: '艺术画廊',
  17: '艺术学校',
  18: '艺术工作室',
  19: '装配线',
  20: '户外田径场地',
  21: '阁楼',
  22: '大礼堂',
  23: '汽车厂',
  24: '汽车展厅',
  25: '荒地',
  26: '商店',
  27: '外部',
  28: '内部',
  29: '球坑',
  30: '舞厅',
  31: '竹林',
  32: '银行金库',
  33: '宴会厅',
  34: '酒吧',
  35: '棒球场',
  36: '地下室',
  37: '室内篮球场',
  38: '浴室',
  39: '室内市场',
  40: '户外市场',
  41: '海滩',
  42: '美容院',
  43: '卧室',
  44: '泊位',
  45: '生物学实验室',
  46: '木板路',
  47: '船的甲板上',
  48: '船屋',
  49: '书店',
  50: '公用电话亭里面',
  51: '植物园',
  52: '室内的弓形窗',
  53: '保龄球馆',
  54: '拳击台',
  55: '桥',
  56: '建筑立面',
  57: '斗牛场',
  58: '车内',
  59: '公交车站内',
  60: '肉店',
  61: '巴特',
  62: '小屋内',
  63: '自助餐厅',
  64: '营地',
  65: '校园',
  66: '自然的',
  67: '城市的',
  68: '糖果店',
  69: '峡谷',
  70: '汽车内饰',
  71: '旋转木马',
  72: '城堡',
  73: '地下墓穴',
  74: '墓地',
  75: '化学实验室',
  76: '孩子的房间',
  77: '礼堂内',
  78: '礼堂外',
  79: '教室',
  80: '悬崖',
  81: '衣柜',
  82: '服装店',
  83: '海岸',
  84: '驾驶舱',
  85: '咖啡店',
  86: '电脑室',
  87: '会议室',
  88: '施工现场',
  89: '玉米田',
  90: '畜栏',
  91: '走廊',
  92: '庭院',
  93: '小溪',
  94: '决口',
  95: '人行横道',
  96: '水坝',
  97: '熟食店',
  98: '百货商店',
  99: '沙',
  100: '植被',
  101: '沙漠公路',
  102: '路边小饭店',
  103: '餐厅',
  104: '餐厅',
  105: '迪斯科舞厅',
  106: '宿舍',
  107: '市中心',
  108: '更衣室',
  109: '车道',
  110: '药店',
  111: '门',
  112: '电梯大堂',
  113: '电梯井',
  114: '发动机室',
  115: '室内自动扶梯',
  116: '开挖',
  117: '布艺店',
  118: '农场',
  119: '快餐店',
  120: '栽培',
  121: '野生的',
  122: '场路',
  123: '火灾逃生',
  124: '消防站',
  125: '鱼塘',
  126: '室内跳蚤市场',
  127: '室内花店',
  128: '美食广场',
  129: '足球场',
  130: '阔叶',
  131: '森林的小路',
  132: '林道',
  133: '正式的花园',
  134: '喷泉',
  135: '厨房',
  136: '车库内',
  137: '车库外',
  138: '加油站',
  139: '外部',
  140: '杂货店内',
  141: '礼品店',
  142: '冰川',
  143: '高尔夫球场',
  144: '温室内',
  145: '温室外',
  146: '石窟',
  147: '体育馆内',
  148: '飞机棚内',
  149: '飞机棚外',
  150: '港',
  151: '五金店',
  152: '海菲尔德	',
  153: '直升机场',
  154: '公路',
  155: '家庭办公室',
  156: '医院的房间',
  157: '温泉',
  158: '酒店外',
  159: '酒店房间',
  160: '房子',
  161: '冰淇淋店',
  162: '浮冰',
  163: '冰架',
  164: '室内溜冰场',
  165: '室外溜冰场',
  166: '冰山',
  167: '工业区',
  168: '胰岛',
  169: '浴缸里',
  170: '监狱',
  171: '日本花园',
  172: '珠宝店',
  173: '垃圾场',
  174: '城堡',
  175: '狗屋外面',
  176: '幼儿园的教室',
  177: '厨房',
  178: '泻湖',
  179: '自然的',
  180: '垃圾填埋',
  181: '降落甲板',
  182: '草坪',
  183: '图书馆室内',
  184: '灯塔',
  185: '客厅',
  186: '大堂',
  187: '更衣室',
  188: '商店外面',
  189: '商店里面',
  190: '沼泽',
  191: '武术馆',
  192: '水',
  193: '清真寺外面',
  194: '山',
  195: '山间小道',
  196: '山上的雪',
  197: '电影院室内',
  198: '博物馆室内',
  199: '音乐工作室',
  200: '自然历史博物馆',
  201: '婴儿室',
  202: '海洋',
  203: '办公室',
  204: '办公隔间',
  205: '石油钻台',
  206: '操作室',
  207: '果园',
  208: '乐池',
  209: '宝塔',
  210: '宫殿',
  211: '食品贮藏室',
  212: '公园',
  213: '室内停车场',
  214: '停车场',
  215: '牧场',
  216: '亭阁',
  217: '宠物店',
  218: '药房',
  219: '电话亭',
  220: '码头',
  221: '比萨店',
  222: '操场',
  223: '广场',
  224: '池塘',
  225: '酒馆内',
  226: '赛马场',
  227: '滚道',
  228: '筏',
  229: '铁路轨道',
  230: '雨林',
  231: '接待',
  232: '娱乐室',
  233: '修理店',
  234: '餐厅',
  235: '餐厅厨房',
  236: '餐厅的露台',
  237: '稻田',
  238: '河',
  239: '岩拱',
  240: '索桥',
  241: '废墟',
  242: '沙盒',
  243: '桑拿',
  244: '服务器机房',
  245: '鞋店',
  246: '大商场室内',
  247: '淋浴',
  248: '滑雪度假村',
  249: '天空',
  250: '摩天大楼',
  251: '雪地',
  252: '足球场',
  253: '稳定的',
  254: '棒球',
  255: '足球',
  256: '室内舞台',
  257: '户外舞台',
  258: '楼梯',
  259: '街道',
  260: '地铁站台',
  261: '超市',
  262: '寿司店',
  263: '沼泽',
  264: '游泳池',
  265: '室内游泳池',
  266: '户外游泳池',
  267: '电视演播室',
  268: '亚洲',
  269: '王座室',
  270: '售票厅',
  271: '修剪花园',
  272: '塔',
  273: '玩具店',
  274: '列车内部',
  275: '火车站台',
  276: '林场',
  277: '树屋',
  278: '沟槽',
  279: '苔原',
  280: '海洋的深处',
  281: '实用的房间',
  282: '山谷',
  283: '植物园',
  284: '兽医办公室',
  285: '高架桥',
  286: '村庄',
  287: '葡萄园',
  288: '火山',
  289: '户外排球场',
  290: '水上公园',
  291: '水塔',
  292: '瀑布',
  293: '浇水洞',
  294: '波动',
  295: '小麦田',
  296: '风电场',
  297: '院子',
  298: '禅园',
}
const objectCofig = {
  0: '鲤鱼',
  1: '金鱼',
  2: '大白鲨',
  3: '虎鲨',
  4: '锤头鲨',
  5: '电鳗',
  6: '黄貂鱼',
  7: '公鸡',
  8: '母鸡',
  9: '鸵鸟',
  10: '燕雀',
  11: '金翅雀',
  12: '朱雀',
  13: '雪鸟',
  14: '雀鸟',
  15: '美洲知更鸟',
  16: '鹎',
  17: '松鸦',
  18: '喜鹊',
  19: '山雀',
  20: '河鸟',
  21: '风筝',
  22: '秃头鹰',
  23: '秃鹫',
  24: '大灰猫头鹰',
  25: '欧洲火蝾螈',
  26: '蝾螈',
  27: '水蜥蜴',
  28: '斑点蝾螈',
  29: '美西螈',
  30: '牛蛙',
  31: '树蛙',
  32: '尾蟾',
  33: '红海龟',
  34: '棱皮龟',
  35: '泥龟',
  36: '鳖',
  37: '箱龟',
  38: '条纹壁虎',
  39: '绿鬣蜥',
  40: '美国变色龙',
  41: '鞭尾蜥蜴',
  42: '飞龙科蜥蜴',
  43: '皱褶蜥蜴',
  44: '鳄蜥',
  45: '毒蜥',
  46: '绿蜥蜴',
  47: '非洲变色龙',
  48: '科莫多龙',
  49: '非洲鳄鱼',
  50: '美国短吻鳄',
  51: '三角龙',
  52: '雷霆蛇',
  53: '环颈蛇',
  54: '猪鼻蛇',
  55: '绿蛇',
  56: '大王蛇',
  57: '乌梢蛇',
  58: '水蛇',
  59: '藤蛇',
  60: '夜蛇',
  61: '蟒蛇',
  62: '岩蟒',
  63: '印度眼镜蛇	',
  64: '曼巴蛇',
  65: '海蛇',
  66: '角蝰',
  67: '响尾蛇',
  68: '角响尾蛇',
  69: '三叶虫',
  70: '喜蛛',
  71: '蝎子',
  72: '金园蛛',
  73: '仓蜘',
  74: '园蛛',
  75: '黑寡妇',
  76: '狼蛛	',
  77: '狼蛛',
  78: '扁虱',
  79: '蜈蚣',
  80: '黑琴鸡',
  81: '雷鸟',
  82: '鹧鸪',
  83: '草原鸡',
  84: '孔雀',
  85: '鹌鹑',
  86: '鹧鸪',
  87: '非洲灰鹦鹉',
  88: '金刚鹦鹉',
  89: '葵花凤头鹦鹉',
  90: '吸蜜鹦鹉',
  91: '鸦鹃',
  92: '蜂虎',
  93: '犀鸟',
  94: '蜂鸟',
  95: '食虫鸟',
  96: '巨嘴鸟',
  97: '公鸭',
  98: '红胸秋沙鸭',
  99: '鹅',
  100: '黑天鹅',
  101: '塔斯克',
  102: '食蚁兽',
  103: '鸭嘴兽',
  104: '袋鼠',
  105: '考拉',
  106: '袋熊',
  107: '水母',
  108: '海葵',
  109: '脑珊瑚',
  110: '扁虫扁形动物',
  111: '线虫',
  112: '海螺',
  113: '蜗牛',
  114: '鼻涕虫',
  115: '裸鳃海蛞蝓',
  116: '石鳖',
  117: '鹦鹉螺',
  118: '珍宝蟹',
  119: '岩石蟹',
  120: '招潮蟹',
  121: '皇帝蟹',
  122: '美国龙虾',
  123: '龙虾',
  124: '小龙虾',
  125: '寄居蟹',
  126: '等足目动物',
  127: '白鹳',
  128: '黑鹳',
  129: '琵鹭',
  130: '火烈鸟',
  131: '小蓝鹭',
  132: '大白鹭',
  133: '麻鸦',
  134: '鹤',
  135: '锦鸡',
  136: '欧洲水鸡',
  137: '美国黑鸭',
  138: '鸨',
  139: '翻石鹬',
  140: '红背鹬',
  141: '红脚鹬',
  142: '半蹼鹬',
  143: '蛎鹬',
  144: '鹈鹕',
  145: '帝企鹅',
  146: '大海鸟',
  147: '灰鲸',
  148: '虎鲸',
  149: '儒艮',
  150: '海狮',
  151: '墨西哥狗',
  152: '日本猎犬',
  153: '马尔济斯犬',
  154: '哈巴狗',
  155: '狮子狗',
  156: '布莱尼姆猎犬',
  157: '巴比',
  158: '巴比',
  159: '罗得西亚脊背犬',
  160: '阿富汗猎犬',
  161: '猎犬',
  162: '比格犬',
  163: '侦探猎犬',
  164: '蓝斑猎狗',
  165: '猎浣熊犬',
  166: '沃克犬',
  167: '英国猎狐犬',
  168: '美洲赤狗',
  169: '俄罗斯猎狼犬',
  170: '爱尔兰猎狼犬',
  171: '意大利灵缇犬',
  172: '惠比特犬',
  173: '依比沙猎犬',
  174: '挪威猎犬',
  175: '奥达猎犬',
  176: '沙克犬瞪羚猎犬',
  177: '苏格兰猎鹿犬',
  178: '威玛猎犬',
  179: '斯塔福德郡斗牛犬',
  180: '美国斗牛犬',
  181: '贝德灵顿犬',
  182: '博德猎狐犬',
  183: '凯丽蓝犬',
  184: '爱尔兰犬',
  185: '诺福克犬',
  186: '诺维奇犬',
  187: '约克郡犬',
  188: '刚毛猎狐犬',
  189: '莱克兰犬',
  190: '锡利哈姆犬',
  191: '艾尔谷犬	',
  192: '凯恩犬',
  193: '澳大利亚犬',
  194: '英国小猎犬',
  195: '波士顿犬',
  196: '迷你雪纳瑞',
  197: '巨型雪纳瑞',
  198: '标准雪纳瑞',
  199: '苏格兰犬',
}


module.exports = {
  formatTime: formatTime,
  _genRequestSign: _genRequestSign,
  app_id: app_id,
  getAjax: getAjax,
  postAjax: postAjax,
  filterImgae: filterImgae,
  beautyImage: beautyImage,
  changeImage: changeImage,
  purikuraImage: purikuraImage,
  sceneConfig: sceneConfig,
  objectCofig: objectCofig,
}
