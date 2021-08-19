// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import jSQL = require('../System/sql/jSQL.js');
import ccLog from "../System/Log/ccLog";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Testscene extends cc.Component {

    @property(cc.Node)
    btn1: cc.Node = null;
    @property(cc.Node)
    btn2: cc.Node = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        this.btn1.on(cc.Node.EventType.TOUCH_END, () => {
            // let jsql =new jSQL()
            ccLog.log("有东西吗", jSQL)
            // jSQL.load(()=>{
            //     let sql = "create table if not exists users (name varchar(25), age int)";
            //     jSQL.query(sql).execute();
            //     ccLog.log("走到这里了吗")
            // });
            jSQL.load(() => {
                jSQL.query("-- Generated with jSQL Devel on Tuesday, February 6th 2018, 3:31pm \n\
	CREATE TABLE IF NOT EXISTS `testeroo` (\n\
		`id` INT(5) NOT NULL,\n\
		`name` VARCHAR(5) NULL,\n\
		`another_id` NUMERIC(6) NOT NULL,\n\
		`uni1` INT(3) NOT NULL UNIQUE KEY,\n\
		`uni2` INT(3) NOT NULL UNIQUE KEY,\n\
		PRIMARY KEY (`id`, `another_id`)\n\
	)").execute();

                var sql = "insert into testeroo values(?, ?, ?, ?, ?)";
                jSQL.query(sql).execute([0, 'farts', 1, 5, 9]);
                jSQL.query(sql).execute([1, 'tird', 2, 6, 8]);
                jSQL.query(sql).execute([1, 'berb', 3, 7, 7]);
                jSQL.query(sql).execute([5, 'farts', 4, 1, 6]);

                var exp = jSQL.export(true, ['testeroo']);

                jSQL.reset();

                // setTimeout(() => {
                //     jSQL.import(exp);
                //
                //     describe('Export Test', function () {
                //
                //         it('Testing Export up in this biaaatch', function () {
                //             var q = jSQL.query("select * from testeroo where id = 1").execute().fetchAll("ASSOC").length;
                //             expect(q.length === 2).to.be.true;
                //         });
                //
                //     });
                // }, 1000);


            });


        }, this)

        this.btn2.on(cc.Node.EventType.TOUCH_END, () => {

        }, this)

    }

    start() {

    }

    // update (dt) {}
}
