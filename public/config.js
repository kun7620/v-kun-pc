window.hkConfig = {
    baseUrl : 'http://localhost:7620',
    // 图标url
    iconfontUrl :'http://at.alicdn.com/t/font_1902076_jqgj5j5r8c.css',
};
// 图片上传地址
window.hkConfig.uploadFile = window.hkConfig.baseUrl + '/admin/file';
document.write('<link rel="stylesheet" href="'+ window.hkConfig.iconfontUrl +'">');
