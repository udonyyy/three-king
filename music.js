// 自动更新的音乐列表（130首歌曲）
const songs = [
  {
    "title": "Abu Dhabi",
    "artist": "Mikolas Josef",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/Abu Dhabi - Mikolas Josef.mp3?v=1"
  },
  {
    "title": "Afraid Of Love",
    "artist": "Kid Travis",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/Afraid Of Love - Kid Travis.mp3?v=1"
  },
  {
    "title": "Ambition",
    "artist": "david hugo",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/Ambition - david hugo.mp3?v=1"
  },
  {
    "title": "Because Of You",
    "artist": "Ne-Yo",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/Because Of You - Ne-Yo.mp3?v=1"
  },
  {
    "title": "body language",
    "artist": "Graham",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/body language - Graham.mp3?v=1?v=1"
  },
  {
    "title": "Dramamine",
    "artist": "flawed mangoes",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/Dramamine - flawed mangoes.mp3?v=1"
  },
  {
    "title": "For Forever",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/For Forever - 华晨宇.mp3?v=1"
  },
  {
    "title": "GF",
    "artist": "方大同",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/GF - 方大同.mp3?v=1"
  },
  {
    "title": "I Love You So",
    "artist": "The Walters",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/I Love You So - The Walters.mp3?v=1"
  },
  {
    "title": "I Quit Drinking",
    "artist": "Kelsea Ballerini; LANY",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/I Quit Drinking - Kelsea Ballerini; LANY.mp3?v=1"
  },
  {
    "title": "It Is What It Is",
    "artist": "Jamie Miller",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/It Is What It Is - Jamie Miller.mp3?v=1"
  },
  {
    "title": "lead me on",
    "artist": "sammy rash",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/lead me on - sammy rash.mp3?v=1"
  },
  {
    "title": "Let You Go",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/Let You Go - 华晨宇.mp3?v=1"
  },
  {
    "title": "Love Song",
    "artist": "方大同",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/Love Song - 方大同.mp3?v=1"
  },
  {
    "title": "Melody",
    "artist": "陶喆",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/Melody - 陶喆.mp3?v=1"
  },
  {
    "title": "My Only One (No Hay Nadie Más)",
    "artist": "Sebastián Yatra; Isabela Moner",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/My Only One (No Hay Nadie Más) - Sebastián Yatra; Isabela Moner.mp3?v=1"
  },
  {
    "title": "no excuses",
    "artist": "Virginia To Vegas",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/no excuses - Virginia To Vegas.mp3?v=1"
  },
  {
    "title": "Oh Love",
    "artist": "Four Leaf Clover",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/Oh Love - Four Leaf Clover.mp3?v=1"
  },
  {
    "title": "Oh Well",
    "artist": "Rich Brian",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/Oh Well - Rich Brian.mp3?v=1"
  },
  {
    "title": "pardon.",
    "artist": "8bite; Cindy吃豆花儿",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/pardon. - 8bite; Cindy吃豆花儿.mp3?v=1"
  },
  {
    "title": "roundabout",
    "artist": "fcj; Ivoris; RYCE",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/roundabout - fcj; Ivoris; RYCE.mp3?v=1"
  },
  {
    "title": "So In Love（深爱）",
    "artist": "迦勒",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/So In Love（深爱） - 迦勒.mp3?v=1"
  },
  {
    "title": "Sunburn",
    "artist": "Brian Cheng",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/Sunburn - Brian Cheng.mp3?v=1"
  },
  {
    "title": "syt=see you tomorrow",
    "artist": "沙一汀EL",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/syt=see you tomorrow - 沙一汀EL.mp3?v=1"
  },
  {
    "title": "Tango",
    "artist": "方大同",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/Tango - 方大同.mp3?v=1"
  },
  {
    "title": "time will tell",
    "artist": "艾力亚斯",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/time will tell - 艾力亚斯.mp3?v=1"
  },
  {
    "title": "VLOG",
    "artist": "沙一汀EL",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/VLOG - 沙一汀EL.mp3?v=1"
  },
  {
    "title": "where we're going (sunset session)",
    "artist": "elijah woods",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/where we're going (sunset session) - elijah woods.mp3?v=1"
  },
  {
    "title": "Why Nobody Fights",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/Why Nobody Fights - 华晨宇.mp3?v=1"
  },
  {
    "title": "XZMHXDXH",
    "artist": "方大同",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/XZMHXDXH - 方大同.mp3?v=1"
  },
  {
    "title": "You Will Never Know It",
    "artist": "Carpetman",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/You Will Never Know It - Carpetman.mp3?v=1"
  },
  {
    "title": "Αφροδίτη",
    "artist": "椅子乐团 The Chairs; 林奕硕 Lin I-Shuo（百合花 Lilium）",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/Αφροδίτη - 椅子乐团 The Chairs; 林奕硕 Lin I-Shuo（百合花 Lilium）.mp3?v=1"
  },
  {
    "title": "一起",
    "artist": "汉堡黄",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/一起 - 汉堡黄.mp3?v=1"
  },
  {
    "title": "三人游",
    "artist": "方大同",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/三人游 - 方大同.mp3?v=1"
  },
  {
    "title": "不朽",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/不朽 - 华晨宇.mp3?v=1"
  },
  {
    "title": "不重逢",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/不重逢 - 华晨宇.mp3?v=1"
  },
  {
    "title": "与火星的孩子对话",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/与火星的孩子对话 - 华晨宇.mp3?v=1"
  },
  {
    "title": "世界主角",
    "artist": "李小眼",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/世界主角 - 李小眼.mp3?v=1"
  },
  {
    "title": "世界是个动物园",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/世界是个动物园 - 华晨宇.mp3?v=1"
  },
  {
    "title": "乌鸦",
    "artist": "汉堡黄",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/乌鸦 - 汉堡黄.mp3?v=1"
  },
  {
    "title": "九月底",
    "artist": "余佳运",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/九月底 - 余佳运.mp3?v=1"
  },
  {
    "title": "人之爱",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/人之爱 - 华晨宇.mp3?v=1"
  },
  {
    "title": "你出现",
    "artist": "汉堡黄",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/你出现 - 汉堡黄.mp3?v=1"
  },
  {
    "title": "你要相信这不是最后一天",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/你要相信这不是最后一天 - 华晨宇.mp3?v=1"
  },
  {
    "title": "写给未来的孩子",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/写给未来的孩子 - 华晨宇.mp3?v=1"
  },
  {
    "title": "卡西莫多的礼物",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/卡西莫多的礼物 - 华晨宇.mp3?v=1"
  },
  {
    "title": "反义词",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/反义词 - 华晨宇.mp3?v=1"
  },
  {
    "title": "变相怪杰",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/变相怪杰 - 华晨宇.mp3?v=1"
  },
  {
    "title": "向阳而生",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/向阳而生 - 华晨宇.mp3?v=1"
  },
  {
    "title": "哀人",
    "artist": "门尼",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/哀人 - 门尼.mp3?v=1"
  },
  {
    "title": "回留",
    "artist": "方大同",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/回留 - 方大同.mp3?v=1"
  },
  {
    "title": "国王与乞丐",
    "artist": "华晨宇; 杨宗纬",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/国王与乞丐 - 华晨宇; 杨宗纬.mp3?v=1"
  },
  {
    "title": "地球之盐",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/地球之盐 - 华晨宇.mp3?v=1"
  },
  {
    "title": "大城小爱",
    "artist": "王力宏",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/大城小爱 - 王力宏.mp3?v=1"
  },
  {
    "title": "天天",
    "artist": "陶喆",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/天天 - 陶喆.mp3?v=1"
  },
  {
    "title": "天气先生",
    "artist": "方大同",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/天气先生 - 方大同.mp3?v=1"
  },
  {
    "title": "好困好累好想你^_៸៸៸៸_^",
    "artist": "ZzZ",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/好困好累好想你^_៸៸៸៸_^ - ZzZ.mp3?v=1"
  },
  {
    "title": "好想我回来啊",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/好想我回来啊 - 华晨宇.mp3?v=1"
  },
  {
    "title": "好想爱这个世界啊",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/好想爱这个世界啊 - 华晨宇.mp3?v=1"
  },
  {
    "title": "寂寞寂寞不好",
    "artist": "曹格",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/寂寞寂寞不好 - 曹格.mp3?v=1"
  },
  {
    "title": "小小虫",
    "artist": "方大同",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/小小虫 - 方大同.mp3?v=1"
  },
  {
    "title": "小镇里的花 (民乐版)",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/小镇里的花 (民乐版) - 华晨宇.mp3?v=1"
  },
  {
    "title": "小镇里的花",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/小镇里的花 - 华晨宇.mp3?v=1"
  },
  {
    "title": "就是爱你",
    "artist": "陶喆",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/就是爱你 - 陶喆.mp3?v=1"
  },
  {
    "title": "幸运大门",
    "artist": "郭顶",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/幸运大门 - 郭顶.mp3?v=1"
  },
  {
    "title": "异类",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/异类 - 华晨宇.mp3?v=1"
  },
  {
    "title": "当全世界忘了我",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/当全世界忘了我 - 华晨宇.mp3?v=1"
  },
  {
    "title": "微光",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/微光 - 华晨宇.mp3?v=1"
  },
  {
    "title": "忒修斯的船",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/忒修斯的船 - 华晨宇.mp3?v=1"
  },
  {
    "title": "忧伤的巨人",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/忧伤的巨人 - 华晨宇.mp3?v=1"
  },
  {
    "title": "怪天气",
    "artist": "YELLOW黄宣; 9m88",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/怪天气 - YELLOW黄宣; 9m88.mp3?v=1"
  },
  {
    "title": "怪诞心理学",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/怪诞心理学 - 华晨宇.mp3?v=1"
  },
  {
    "title": "我不是农人",
    "artist": "方大同",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/我不是农人 - 方大同.mp3?v=1"
  },
  {
    "title": "我们的歌",
    "artist": "王力宏",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/我们的歌 - 王力宏.mp3?v=1"
  },
  {
    "title": "我们都是孤独的",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/我们都是孤独的 - 华晨宇.mp3?v=1"
  },
  {
    "title": "我管你",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/我管你 - 华晨宇.mp3?v=1"
  },
  {
    "title": "所以你睡了没",
    "artist": "沙一汀EL",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/所以你睡了没 - 沙一汀EL.mp3?v=1"
  },
  {
    "title": "才二十三",
    "artist": "方大同",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/才二十三 - 方大同.mp3?v=1"
  },
  {
    "title": "找自己",
    "artist": "陶喆",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/找自己 - 陶喆.mp3?v=1"
  },
  {
    "title": "抑人",
    "artist": "银河快递; 门尼",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/抑人 - 银河快递; 门尼.mp3?v=1"
  },
  {
    "title": "拆弹专家",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/拆弹专家 - 华晨宇.mp3?v=1"
  },
  {
    "title": "敏感小孩",
    "artist": "沙一汀EL",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/敏感小孩 - 沙一汀EL.mp3?v=1"
  },
  {
    "title": "早点早点",
    "artist": "沙一汀EL",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/早点早点 - 沙一汀EL.mp3?v=1"
  },
  {
    "title": "春风吹",
    "artist": "方大同",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/春风吹 - 方大同.mp3?v=1"
  },
  {
    "title": "晨光里有你",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/晨光里有你 - 华晨宇.mp3?v=1"
  },
  {
    "title": "普通到不普通的人生",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/普通到不普通的人生 - 华晨宇.mp3?v=1"
  },
  {
    "title": "普通女孩",
    "artist": "沙一汀EL",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/普通女孩 - 沙一汀EL.mp3?v=1"
  },
  {
    "title": "普通朋友",
    "artist": "陶喆",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/普通朋友 - 陶喆.mp3?v=1"
  },
  {
    "title": "智商二五零",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/智商二五零 - 华晨宇.mp3?v=1"
  },
  {
    "title": "望春风",
    "artist": "陶喆",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/望春风 - 陶喆.mp3?v=1"
  },
  {
    "title": "枕边故事",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/枕边故事 - 华晨宇.mp3?v=1"
  },
  {
    "title": "梁山伯与茱丽叶",
    "artist": "卓文萱; 曹格",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/梁山伯与茱丽叶 - 卓文萱; 曹格.mp3?v=1"
  },
  {
    "title": "永不熄灭的火焰",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/永不熄灭的火焰 - 华晨宇.mp3?v=1"
  },
  {
    "title": "江湖中人",
    "artist": "方大同",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/江湖中人 - 方大同.mp3?v=1"
  },
  {
    "title": "没啥好说",
    "artist": "方大同",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/没啥好说 - 方大同.mp3?v=1"
  },
  {
    "title": "流沙",
    "artist": "陶喆",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/流沙 - 陶喆.mp3?v=1"
  },
  {
    "title": "温暖的房子",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/温暖的房子 - 华晨宇.mp3?v=1"
  },
  {
    "title": "滥俗的歌",
    "artist": "汉堡黄",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/滥俗的歌 - 汉堡黄.mp3?v=1"
  },
  {
    "title": "点燃银河尽头的篝火",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/点燃银河尽头的篝火 - 华晨宇.mp3?v=1"
  },
  {
    "title": "烟火里的尘埃",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/烟火里的尘埃 - 华晨宇.mp3?v=1"
  },
  {
    "title": "爱我还是他",
    "artist": "陶喆",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/爱我还是他 - 陶喆.mp3?v=1"
  },
  {
    "title": "爱是个什么东西",
    "artist": "陶喆",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/爱是个什么东西 - 陶喆.mp3?v=1"
  },
  {
    "title": "爱爱爱",
    "artist": "方大同",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/爱爱爱 - 方大同.mp3?v=1"
  },
  {
    "title": "爱错",
    "artist": "王力宏",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/爱错 - 王力宏.mp3?v=1"
  },
  {
    "title": "特别的人",
    "artist": "方大同",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/特别的人 - 方大同.mp3?v=1"
  },
  {
    "title": "环游",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/环游 - 华晨宇.mp3?v=1"
  },
  {
    "title": "红豆",
    "artist": "方大同",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/红豆 - 方大同.mp3?v=1"
  },
  {
    "title": "背叛",
    "artist": "曹格",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/背叛 - 曹格.mp3?v=1"
  },
  {
    "title": "花落时相遇",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/花落时相遇 - 华晨宇.mp3?v=1"
  },
  {
    "title": "虚幻与现实",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/虚幻与现实 - 华晨宇.mp3?v=1"
  },
  {
    "title": "蜉蝣",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/蜉蝣 - 华晨宇.mp3?v=1"
  },
  {
    "title": "蝴蝶",
    "artist": "step.jad依加",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/蝴蝶 - step.jad依加.mp3?v=1"
  },
  {
    "title": "蝴蝶",
    "artist": "陶喆",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/蝴蝶 - 陶喆.mp3?v=1"
  },
  {
    "title": "讨厌红楼梦",
    "artist": "陶喆",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/讨厌红楼梦 - 陶喆.mp3?v=1"
  },
  {
    "title": "谁知爱是什么",
    "artist": "方大同",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/谁知爱是什么 - 方大同.mp3?v=1"
  },
  {
    "title": "走，一起去看日出吧",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/走，一起去看日出吧 - 华晨宇.mp3?v=1"
  },
  {
    "title": "逃离乌托邦",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/逃离乌托邦 - 华晨宇.mp3?v=1"
  },
  {
    "title": "逍遥一客",
    "artist": "Bo Peep",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/逍遥一客 - Bo Peep.mp3?v=1"
  },
  {
    "title": "那个女孩",
    "artist": "陶喆; 卢广仲",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/那个女孩 - 陶喆; 卢广仲.mp3?v=1"
  },
  {
    "title": "那些我尚未知道的美丽",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/那些我尚未知道的美丽 - 华晨宇.mp3?v=1"
  },
  {
    "title": "那沙漠里的水",
    "artist": "方大同",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/那沙漠里的水 - 方大同.mp3?v=1"
  },
  {
    "title": "银河",
    "artist": "汪苏泷",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/银河 - 汪苏泷.mp3?v=1"
  },
  {
    "title": "风之海",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/风之海 - 华晨宇.mp3?v=1"
  },
  {
    "title": "飞机场的10_30",
    "artist": "陶喆",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/飞机场的10_30 - 陶喆.mp3?v=1"
  },
  {
    "title": "飞行模式",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/飞行模式 - 华晨宇.mp3?v=1"
  },
  {
    "title": "鱼仔",
    "artist": "卢广仲",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/鱼仔 - 卢广仲.mp3?v=1"
  },
  {
    "title": "麦恩莉",
    "artist": "方大同",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/麦恩莉 - 方大同.mp3?v=1"
  },
  {
    "title": "黑白艺术家",
    "artist": "华晨宇",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/黑白艺术家 - 华晨宇.mp3?v=1"
  },
  {
    "title": "黑色柳丁",
    "artist": "陶喆",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/黑色柳丁 - 陶喆.mp3?v=1"
  },
  {
    "title": "헤어지자",
    "artist": "dori",
    "file": "https://unpkg.com/@udonyyy/three-king@main/music/헤어지자 - dori.mp3?v=1"
  }
];
