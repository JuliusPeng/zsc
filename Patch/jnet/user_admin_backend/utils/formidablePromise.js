const formidable = require('formidable'); //�ļ�����ģ��
const fs = require('fs'); //�ļ�ģ��
const path = require('path'); //pathģ��

module.exports = function(req) {
    const form = new formidable.IncomingForm();
    let uploadDir = path.resolve(__dirname,'../public/images/robot');

    form.uploadDir = uploadDir; //�洢Ŀ¼
    form.keepExtensions = true; //������׺
    form.encoding = 'utf-8'; //���ñ���
    form.maxFieldsSize = 2 * 1024 //��������ļ�
    console.log(4)
    return new Promise(function(resolve, reject) {
        form.parse(req, function(err, fields, files) {
            if (err) {
                return console.log(err);
            }
            resolve({
                fields,
                files
            });
        })
    })


}