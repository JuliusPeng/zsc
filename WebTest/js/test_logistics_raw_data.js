
export default class TestLogisticsRawData {

    constructor() {}

    buildTestCreateData() {
        // �й�(t0) -> ����˹(t1)��ǩ��
        let num3 = "JNTCU0600046683YQ";
        let transNum3 = "�������������й� -> ����˹��ǩ�գ�";
        let model3 = "J-NET��ȫͨ����Russia, GTMS_SIGNED��"; 
        let destinationCountry3 = 7; // Russia
        let lastStatus3 = 28;        // GTMS_SIGNED("�û�ǩ��","Delivered")
        let tracks3 = 
            "{" +
                "\"trackElementList\":[{" +
                    "\"type\":\"01\"," +            // OC
                    "\"time\":\"1537924497\"," +    // 2018-09-26 09:14:57
                    "\"country\":\"086\"," +        // China
                    "\"city\":\"\"," +
                    "\"facilityName\":\"time(0) -> track(0)��������OC, 2018-09-26 09:14:57, China, PU_PICKUP_SUCCESS��\"," +
                    "\"timeZone\":\"+8\"," +        // +8
                    "\"desc\":\"�Ϻ�����������ɽ·2016�źϴ�����6H�Ϻ�����̩��Ϣ�Ƽ����޹�˾�����ɹ���\"," +
                    "\"actionCode\":\"001\"" +      // PU_PICKUP_SUCCESS("���ճɹ�","Item picked up by courier")
                "}&{" +
                    "\"type\":\"02\"," +            // DC
                    "\"time\":\"1539854640\"," +    // 2018-10-18 17:24:00
                    "\"country\":\"07\"," +         // Russia
                    "\"city\":\"\"," +
                    "\"facilityName\":\"time(1) -> track(1)��������DC, 2018-10-18 17:24:00, Russia, GTMS_SIGNED��\"," +
                    "\"timeZone\":\"+3\"," +        // +3
                    "\"desc\":\"����ӧѧ� �ҧ�� ����֧�ߧ� �է���ѧӧݧ֧� ���ݧ��ѧ�֧ݧ�. ����ѧ�ڧҧ� ���� �ӧ����ݧ�٧�ӧѧݧڧ�� �ߧѧ�ڧާ� ���ݧ�ԧѧާ�\"," +
                    "\"actionCode\":\"028\"" +      // GTMS_SIGNED("�û�ǩ��","Delivered")
                "}]" +
            "}";
        
        // �й�(t1) -> ����(t2) -> ����˹(t0)��ǩ��
        let num4 = "JNTCU0600046684YQ";
        let info4 = 
            "{" +
                "\"error\":null," +
                "\"num\":\"JNTCU0600046684YQ\"," +
                "\"transNum\":\"�������������й� -> ���� -> ����˹��ǩ�գ�\"," +
                "\"model\":\"J-NET��ȫͨ����Russia, GTMS_SIGNED��\"," +
                "\"destinationCountry\":\"07\"," +  // Russia
                "\"lastStatus\":\"028\"," +         // GTMS_SIGNED("�û�ǩ��","Delivered")
                "\"trackElementList\":[{" +
                    "\"type\":\"02\"," +            // DC 
                    "\"time\":\"1538797740\"," +    // 2018-10-06 11:49:00
                    "\"country\":\"07\", " +        // Russia
                    "\"city\":\"\"," +
                    "\"facilityName\":\"time(2) -> track(0)��������DC, 2018-10-06 11:49:00, Russia, GTMS_SIGNED��\"," +
                    "\"timeZone\":\"+3\"," +        // +3
                    "\"desc\":\"����ӧѧ� �ҧ�� ����֧�ߧ� �է���ѧӧݧ֧� ���ݧ��ѧ�֧ݧ�. ����ѧ�ڧҧ� ���� �ӧ����ݧ�٧�ӧѧݧڧ�� �ߧѧ�ڧާ� ���ݧ�ԧѧާ�\"," +
                    "\"actionCode\":\"028\"" +      // GTMS_SIGNED("�û�ǩ��","Delivered")
                "}&{" +
                    "\"type\":\"1\"," +             // OC
                    "\"time\":\"1537924497\"," +    // 2018-09-26 09:14:57
                    "\"country\":\"86\"," +         // China
                    "\"city\":\"\"," +
                    "\"facilityName\":\"time(0) -> track(1)��������OC, 2018-09-26 09:14:57, China, PU_PICKUP_SUCCESS��\"," +
                    "\"timeZone\":\"+8\", " +       // +8
                    "\"desc\":\"�Ϻ�����������ɽ·2016�źϴ�����6H�Ϻ�����̩��Ϣ�Ƽ����޹�˾�����ɹ���\"," +
                    "\"actionCode\":\"1\"" +        // PU_PICKUP_SUCCESS("���ճɹ�","Item picked up by courier")
                "}&{" +
                    "\"type\":\"002\"," +           // DC
                    "\"time\":\"1538365740\"," +    // 2018-10-01 11:49:00
                    "\"country\":\"007\"," +        // USA
                    "\"city\":\"\"," +
                    "\"facilityName\":\"time(1) -> track(2)��������DC, 2018-10-01 11:49:00, USA, VISIBLE_UNKOWN��\"," +
                    "\"timeZone\":\"-5\"," +        // -5
                    "\"desc\":\"The parcel is ready to transfer to the courier\"," +
                    "\"actionCode\":\"0037\"" +     // VISIBLE_UNKOWN("ת��","transfer")     
                "}]" +
            "}";
        
        // �й�(t3) -> ����(t1) -> ����(t0) -> ����˹(t2)��ת����
        let num5 = "JNTCU0600046685YQ";
        let transNum5 = "�������������й� -> ���� -> ���� -> ����˹��ת���У�";
        let model5 = "J-NET��ȫͨ����Russia, VISIBLE_UNKOWN��"; 
        let destinationCountry5 = 7;                // Russia
        let lastStatus5 = 37;                       // VISIBLE_UNKOWN("ת��","transfer")
        let tracks5 =
            "{" +
                "\"trackElementList\":[{" +
                    "\"type\":\"2\"," +             // DC
                    "\"time\":\"1541991540\"," +    // 2018-11-12 10:59:00
                    "\"country\":\"1\"," +          // USA
                    "\"city\":\"\"," +
                    "\"facilityName\":\"time(2) -> track(0)��������DC, 2018-11-12 10:59:00, USA, VISIBLE_UNKOWN��\"," +
                    "\"timeZone\":\"-5\"," +        // -5
                    "\"desc\":\"International shipment release - Export\"," +
                    "\"actionCode\":\"37\"" +       // VISIBLE_UNKOWN("ת��","transfer")
                "}&{" +
                    "\"type\":\"2\"," +             // DC
                    "\"time\":\"1541813640\"," +    // 2018-11-10 09:34:00
                    "\"country\":\"33\"," +         // France
                    "\"city\":\"\"," +
                    "\"facilityName\":\"time(1) -> track(1)��������DC, 2018-11-10 09:34:00, France, VISIBLE_UNKOWN��\"," +
                    "\"timeZone\":\"+0\"," +        // +0
                    "\"desc\":\"Transport de marchandises\"," +
                    "\"actionCode\":\"37\"" +       // VISIBLE_UNKOWN("ת��","transfer")
                "}&{" +
                    "\"type\":\"2\"," +             // DC
                    "\"time\":\"1542079440\"," +    // 2018-11-13 11:24:00
                    "\"country\":\"7\"," +          // Russia
                    "\"city\":\"\"," +
                    "\"facilityName\":\"time(3) -> track(2)��������DC, 2018-11-13 11:24:00, Russia, VISIBLE_UNKOWN��\"," +
                    "\"timeZone\":\"+3\"," +        // +3
                    "\"desc\":\"����ڧߧ�� �ߧ� ���ѧߧ٧ڧ�ߧ�� ��ܧݧѧ�\"," +      
                    "\"actionCode\":\"37\"" +       // VISIBLE_UNKOWN("ת��","transfer")
                "}&{" +
                    "\"type\":\"1\"," +             // OC
                    "\"time\":\"1540966156\"," +    // 2018-10-31 14:09:16
                    "\"country\":\"86\"," +         // China
                    "\"city\":\"\"," +
                    "\"facilityName\":\"time(0) -> track(3)��������OC, 2018-10-31 14:09:16, China, PU_PICKUP_SUCCESS��\"," +
                    "\"timeZone\":\"+8\"," +        // +8
                    "\"desc\":\"�Ϻ�����������ɽ·2016�źϴ�����6H�Ϻ�����̩��Ϣ�Ƽ����޹�˾�����ɹ���\"," +      
                    "\"actionCode\":\"1\"" +       // PU_PICKUP_SUCCESS("���ճɹ�","Item picked up by courier")
                "}]" +
            "}";
        
        let num6 = "JNTCU0600046686YQ";
        let info6 = 
            "{\"error\":null," +
                "\"num\":\"JNTCU0600046686YQ\"," +
                "\"transNum\":\"MSK0000027696\"," +
                "\"model\":\"J-NET��ȫͨINFO6\"," +
                "\"destinationCountry\":\"0086\"," +
                "\"lastStatus\":\"77\"," +
                "\"trackElementList\":[{" +
                    "\"type\":\"0\"," +
                    "\"time\":\"1499918040\"," +
                    "\"country\":\"086\"," +
                    "\"city\":\"0724\"," +
                    "\"facilityName\":\"SF\"," +
                    "\"timeZone\":\"+3\"," +
                    "\"desc\":\"SF is good.\"," +
                    "\"actionCode\":\"10\"" +
                "}&{" +
                    "\"type\":\"1\"," +
                    "\"time\":\"1543804012\"," +
                    "\"country\":\"86\"," +
                    "\"city\":\"021\"," +
                    "\"facilityName\":\"Sorting center of J-NET\"," +
                    "\"timeZone\":\"-3\"," +
                    "\"desc\":\"Order received successfully\"," +
                    "\"actionCode\":\"66\"" +
                "}&{" +
                    "\"type\":\"1\"," +
                    "\"time\":\"1499420340\"," +
                    "\"country\":\"0086\"," +
                    "\"city\":\"010\"," +
                    "\"facilityName\":\"Sorting center of J-NET\"," +
                    "\"timeZone\":\"+3\"," +
                    "\"desc\":\"The parcel is ready to transfer to the courier\"," +
                    "\"actionCode\":\"38\"" +
                "}]" +
            "}";
        
        let num7 = "JNTCU0600046687YQ";
        let transNum7 = "MSK0000027697";
        let model7 = "J-NET��ȫͨINFO7"; 
        let destinationCountry7 = 7;
        let lastStatus7 = 38;
        let tracks7 =
            "{" +
                "\"trackElementList\":[{" +
                    "\"type\":\"1\"," +
                    "\"time\":\"1543804012\"," +
                    "\"country\":\"7\"," +
                    "\"city\":\"0571\"," +
                    "\"facilityName\":\"Track7-1\"," +
                    "\"timeZone\":\"+3\"," +
                    "\"desc\":\"Track7-1\"," +
                    "\"actionCode\":\"18\"" +
                "}&{" +
                    "\"type\":\"1\"," +
                    "\"time\":\"1543804012\"," +
                    "\"country\":\"7\"," +
                    "\"city\":\"021\"," +
                    "\"facilityName\":\"Track7-2\"," +
                    "\"timeZone\":\"+3\"," +
                    "\"desc\":\"Track7-2\"," +
                    "\"actionCode\":\"10\"" +
                "}&{" +
                    "\"type\":\"0\"," +
                    "\"time\":\"1543804012\"," +
                    "\"country\":\"7\"," +
                    "\"city\":\"0021\"," +
                    "\"facilityName\":\"Track7-3\"," +
                    "\"timeZone\":\"+3\"," +
                    "\"desc\":\"Track7-3\"," +
                    "\"actionCode\":\"48\"" +
                "}]" +
            "}";

        let data = new Array();

        data.push({
                    type: "update",
                    num: num3,
                    transNum: transNum3,
                    model: model3,
                    destinationCountry: destinationCountry3,
                    lastStatus: lastStatus3,
                    tracks: tracks3
                });
        data.push({
                    type: "updateEx",
                    num: num4,
                    info: info4
                });
        data.push({
                    type: "update",
                    num: num5,
                    transNum: transNum5,
                    model: model5,
                    destinationCountry: destinationCountry5,
                    lastStatus: lastStatus5,
                    tracks: tracks5
                });
        data.push({
                    type: "updateEx",
                    num: num6,
                    info: info6
                });
        data.push({
                    type: "update",
                    num: num7,
                    transNum: transNum7,
                    model: model7,
                    destinationCountry: destinationCountry7,
                    lastStatus: lastStatus7,
                    tracks: tracks7
                });

        return data;
    }

    buildTestUpdateData() {
        let num8 = "JNTCU0600046688YQ";
        let transNum8 = "MSK0000027698";
        let model8 = "�Ϻ�����̩��Ϣ�Ƽ����޹�˾ �Ϻ�����������ɽ·2016�źϴ�����6H"; 
        let destinationCountry8 = 7;
        let lastStatus8 = 38;

        let num9 = "JNTCU0600046689YQ";
        let brief9 =
            "{" +
                "\"error\":null," +
                "\"num\":\"JNTCU0600046689YQ\"," +
                "\"transNum\":\"MSK0000027699\"," +
                "\"model\":\"J-NET��ȫͨINFO9\"," +
                "\"destinationCountry\":\"07\"," +
                "\"lastStatus\":\"10\"" +
            "}";

        let num5 = "JNTCU0600046685YQ";
        let newTracks5 =
            "{" +
                "\"trackElementList\":[{" +
                    "\"type\":\"1\"," +
                    "\"time\":\"1543804012\"," +
                    "\"country\":\"07\"," +
                    "\"city\":\"0021\"," +
                    "\"facilityName\":\"NewTrack5-1\"," +
                    "\"timeZone\":\"-3\"," +
                    "\"desc\":\"�Ϻ�����̩��Ϣ�Ƽ����޹�˾ �Ϻ�����������ɽ·2016�źϴ�����6H\"," +
                    "\"actionCode\":\"18\"" +
                "}&{" +
                    "\"type\":\"0\"," +
                    "\"time\":\"1543804509\"," +
                    "\"country\":\"007\"," +
                    "\"city\":\"021\"," +
                    "\"facilityName\":\"NewTrack5-2\"," +
                    "\"timeZone\":\"+3\"," +
                    "\"desc\":\"NewTrack5-2\"," +
                    "\"actionCode\":\"88\"" +
                "}]" +
            "}";

        let data = new Array();

        data.push({
                    type: "updateBrief",
                    num: num8,
                    transNum: transNum8,
                    model: model8,
                    destinationCountry: destinationCountry8,
                    lastStatus: lastStatus8
                });
        data.push({
                    type: "updateBriefEx",
                    num: num9,
                    info: brief9
                });
        data.push({
                    type: "updateTracks",
                    num: num5,
                    info: newTracks5
                });

        return data;
    }

    buildAnalyticsAmountData() {
    }
}