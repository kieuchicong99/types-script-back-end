import Sequelize from 'sequelize/index';
export interface ExamAttributes {
    name?: string;
    score?: number
    timedo?: number
    status?: boolean;

}

export interface ExamInstance {
    id: number;
    createdAt: Date;
    updatedAt: Date;

    name: string;
    score: number
    timedo: number
    status: boolean;

}

export const ExamFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
    var exam = sequelize.define('exam', {
        name: 
        {type:DataTypes.STRING,
        unique:true
        },
        score: DataTypes.INTEGER,
        timedo: DataTypes.INTEGER,
        status: {
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }
    });

    exam.associate = function (models) {
        // associations can be defined here
        exam.belongsToMany(models.Question, {
            foreignKey: 'exam_id',
            through: {
                model: models.ExamQuestion,
                unique: false
                
            }
        })
    };

    return exam;
};
