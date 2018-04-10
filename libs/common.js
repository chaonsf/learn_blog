const crypto=require("crypto");

module.exports={
    MD5_SUFFIX:"shjdjhjkdssjkkjjdshjjkskklsdlk[[]sdalsl;alaasdd",//任意的，随你怎么写，主要是为了加密破解难度
    md5:function (str) { //传的是要加密的东西
        var obj=crypto.createHash("md5");
        obj.update(str);

        return obj.digest("hex")
    }
}