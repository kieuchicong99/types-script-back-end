// cac chuc nang voi bai lam cuar thi sinh 
import { Database } from '../db/models';
import * as express from 'express';
import Controller from '../interface/BaseController'

export default class ExamController implements Controller {
    public data = {}
    public status = 200
    public db = Database.setInstance(null);
    create = async (request: express.Request, response: express.Response) => {
        console.log(request.body);
        try {
            let data = request.body
            let exam = await this.db.db.Exam.create(data);
            this.data = exam
        } catch (e) {
            this.data = { success: false, message: "Không thể tao môn học" }
        }
        response.status(this.status).json(this.data)


    }
    updateConfig = async (request: express.Request, response: express.Response) => {

    }
    updateQuestion = async (request: express.Request, response: express.Response) => {
        console.log(request.params.id)
        console.log(request.body)
        let exam_id = request.params.id;
        let question_id = request.body.question
        let score = request.body.score
        console.log(request.body.score)
        try {

            let ExamQuestion = await this.db.db.ExamQuestion.upsert({
                exam_id,
                question_id,
                score

            })

            this.data = { success: true, message: "Upadate thành công " };
        } catch (e) {
            this.data = { success: true, message: "Upadate thất bại " };
        }
        response.status(this.status).json(this.data)
    }
    get = async (request: express.Request, response: express.Response) => {
        console.log(request.body)
        try {
            let exam = await this.db.db.Exam.findOne({
                where: { id: 1 },
                attributes: ['id', 'name', 'timedo'],
               
                include: [{
                    model: this.db.db.Question,
                    through: { attributes: [] },
                    include: [
                        {
                            model: this.db.db.Answer,
                            through: { attributes: [] },
                            attributes: ['id', 'content'],

                        }
                   
                    ],
                    attributes: ['id', 'content'],
                }]

            })
            console.log(exam)
            
            this.data = exam
        } catch (error) {
            console.log(error)
        }
        response.status(this.status).json(this.data)

    }

}