window.hkConfig = {
    baseUrl : 'http://localhost:7620',
    // 图标url
    iconfontUrl :'http://at.alicdn.com/t/font_1902076_08f0e6x0qwtb.css',
};
// 图片上传地址
window.hkConfig.uploadFile = window.hkConfig.baseUrl + '/admin/file';
document.write('<link rel="stylesheet" href="'+ window.hkConfig.iconfontUrl +'">');