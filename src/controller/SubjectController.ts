// cac chuc nang voi bai lam cuar thi sinh 
import { Database } from '../db/models';
import * as express from 'express';
import Controller from '../interface/BaseController'
import { SubjectAttributes } from '../db/models/subject';


export default class SubjectController implements Controller {
    public data = {}
    public status = 200
    public db = Database.setInstance(null);
    create = async(request: express.Request, response: express.Response)=>{
        console.log(request.body)
        let data:SubjectAttributes=request.body
        try{
     let subject  =await this.db.db.Subject.create(data)
     this.data={success:true,data: subject.dataValues.id}
    }catch(e){

    this.status=400;
    this.data={success:false,message:"Khong them dc mon hoc"}
    }
    response.status(this.status).json(this.data)
    }
    getlist = async(request: express.Request, response: express.Response)=>{
        console.log(request.query)
        let page = request.query.page||1;
        let limit =20;
        let offset=limit*(page-1)
        try{
          let subjects =await this.db.db.Subject.findAll({ attributes: ['id', 'name'],
          limit: limit,
          offset: offset,
          $sort: { id: 1 }
    });
          this.data={ success:true,subjects} 
          console.log(subjects)
        }catch(e){
         this.status= 400;
         this.data={success:false,message:"Có lỗi xảy ra "}
        }
        response.status(this.status).json(this.data)
    }



}