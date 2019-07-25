/**
 * @file qrcode组件
 */
import 'qrcode-generator';

export default {
    props: {
        text: {
            type: String
        }
    },
    methods: {
        createQrcode(
            text: string,
        ) {
            qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];

            var qr = qrcode(0, 'M');
            qr.addData(text, 'Byte');
            qr.make();

            return qr.createImgTag();
        }
    },
    template: `<div class="qrcode" v-html="createQrcode(text)"></div>`
}
