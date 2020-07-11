// 加密
import CryptoJS from 'crypto-js';

const hk = {
    /**
     * 【增】：两种方式：
     * 1.向 test 表插入一个 nickname 字段，如果该表不存在，则自动建立。
     * hk.data('test', {
     *   key: 'nickname'
     *   ,value: '笑笑'
     * });
     * 2.直接新增 key 和 value
     * hk.data('nickname','笑笑');
     *
     * 【删】：删除 test 表的 nickname 字段
     * hk.data('test', {
     *   key: 'nickname'
     *   ,remove: true
     * });
     * hk.data('test', null); //删除test表
     *
     * 【改】：同【增】，会覆盖已经存储的数据
     *
     * 【查】：向 test 表读取全部的数据
     * var localTest = hk.data('test');
     * console.log(localTest.nickname); //获得“笑笑”
     * @param t
     * @param o
     * @param n
     * @returns {boolean|*}
     */
    data: function (t, o, n) {
        if (t = t || 'hk', n = n || localStorage, JSON.parse) {
            if (null === o) return delete n[t];
            if ((o && 'object' !== typeof o) || ('object' === typeof o && o['key'] == null)) {
                if ('object' === typeof o && o.key == null) {
                    return n[t] = JSON.stringify(o);
                }
                return n[t] = o;
            }
            o = 'object' == typeof o ? o : {key: o};
            let r = '';
            try {
                r = JSON.parse(n[t]);
            } catch (i) {
                r = {};
            }
            return 'value' in o && (r[o.key] = o.value), o.remove && delete r[o.key], JSON.stringify(r) != '{}' ? n[t] = JSON.stringify(r) : '', o.key ? r[o.key] : JSON.stringify(r) != '{}' ? r : '';
        }
    },
    /**
     * @author hk
     * @date 2020-5-30
     * @description 将有父子关系的扁平化的数据转成树结构数据
     * @param data list数值
     * @param attr 自定义参数，根据自己表字段定义，示例：
     *          {
                    id: 'id', // id字段名
                    parendId: 'parendId', // 父级id字段名
                    name: 'name', // 名称的字段名
                    rootId: '' // 顶层节点父级id
                }
     * @param isConcise true或者false，默认false。是否采用简介的数据格式
     *                如果使用简介数据格式就只会保留id、parendId、name三个字段
     * @returns {[]}
     */
    toTreeData: function (data, attr, isConcise) {
        if (attr == null) {
            attr = {
                id: 'id', // id字段名
                parendId: 'parendId', // 父级id字段名
                name: 'name', // 名称的字段名
                rootId: '' // 顶层节点父级id
            };
        }
        let tree = [];
        let resData = JSON.parse(JSON.stringify(data));
        for (let i = 0; i < resData.length; i++) {
            // 顶层节点的值可能是 ''控制符 也可能是 null
            let root = resData[i][attr.parendId];
            root = root == null ? '' : root;
            if (root === attr.rootId) {
                let obj;
                if (isConcise != null) {
                    obj = {
                        id: resData[i][attr.id],
                        name: resData[i][attr.name],
                        children: []
                    };
                } else {
                    obj = resData[i];
                    obj.children = [];
                }
                tree.push(obj);
                resData.splice(i, 1);
                i--;
            }
        }
        let run = function (treeArrs) {
            if (resData.length > 0) {
                for (let i = 0; i < treeArrs.length; i++) {
                    for (let j = 0; j < resData.length; j++) {
                        if (treeArrs[i][attr.id] === resData[j][attr.parendId]) {
                            let obj;
                            if (isConcise) {
                                obj = {
                                    id: resData[i][attr.id],
                                    name: resData[i][attr.name],
                                    children: []
                                };
                            } else {
                                obj = resData[j];
                                obj.children = [];
                            }
                            treeArrs[i].children.push(obj);
                            resData.splice(j, 1);
                            j--;
                        }
                    }
                    run(treeArrs[i].children);
                }
            }
        };
        run(tree);
        return tree;
    },
    /**
     * 将字符串根据位数用逗号分割
     * var str = 'abdhiedhjofe';
     * console.log(fenGeString(str,3));//abd,hie,dhj,ofe
     * @param str
     * @param num
     * @returns {string}
     */
    fenGeString: function (str, num) { //每num位就添加一个逗号
        //先将str转换为数组
        let strToArr = str.split('');
        for (let i = num; i < str.length; i += num + 1) {
            strToArr.splice(i, 0, ',');
        }
        return strToArr.join('');
    },
    /**
     * 获取uuid
     * @returns {*} 长度32位不带 -
     */
    getUuid: function () {
        /**
         * @return {string}
         */
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
    },
    /**
     * 复制内容到剪贴板
     * @param text 要复制的内容
     * @returns {boolean} 成功返回 true  失败返回 false
     */
    copy: function (text) {
        try {
            const input = document.createElement('textarea');
            input.value = text;
            document.body.appendChild(input);
            input.select();
            document.execCommand('Copy');
            document.body.removeChild(input);
            return true;
        } catch (e) {
            return false;
        }

    },
    /**
     * 添加key-value到cookie
     * */
    setCookie: function (name, value) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },

    /**
     * 读取cookie
     * */
    getCookie: function (name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    },
    /**
     * AES对称加密
     * @param word 需要加密的文本
     * @param key 密钥
     * @returns {string}
     */
    encrypt: function (word, key) {
        return CryptoJS.AES.encrypt(word, key).toString();
    },
    /**
     * AES对称解密
     * @param word 需要解密的文本
     * @param key 密钥
     * @returns {string}
     */
    decrypt: function (word, key) {
        return CryptoJS.AES.decrypt(word, key).toString(CryptoJS.enc.Utf8);
    },
    /**
     * MD5加密
     * @param word 需要加密的文本
     * @returns {*}
     */
    md5: function (word) {
        return CryptoJS.MD5(word).toString();
    },

    /**
     * 字节转换成K、M、G、T 单位 保留两位小数
     * @param size 字节数
     * @param size 保留的小数位 0或者null表示不保留小数
     * @returns {string}
     */
    transformByte(size, n) {
        if (!size)
            return "";
        if(!n)
            n = 0;
        let num = 1024.00; //byte
        if (size < num)
            return size + "B";
        if (size < Math.pow(num, 2))
            return (size / num).toFixed(n) + "K"; //kb
        if (size < Math.pow(num, 3))
            return (size / Math.pow(num, 2)).toFixed(n) + "M"; //M
        if (size < Math.pow(num, 4))
            return (size / Math.pow(num, 3)).toFixed(n) + "G"; //G
        return (size / Math.pow(num, 4)).toFixed(n) + "T"; //T
    }
};
export default hk;
