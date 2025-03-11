import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false
            });
        };

        let company = await Company.findOne({name:companyName});
        if ( company ) {
            return res.status(400).json({
                message: "Compnay is already exist",
                success: false
            });
        };

        company = await Company.create({
            name: companyName,
            userId: req.id
        });
        return res.status(200).json({
            message: "Company register successfully",
            company,
            success: false
        })
    } catch (error) {
        console.log(error);
    }
}

export const getCompany = async (req, res) => {
    try {
        
        const userId = req.id;
        const company = await Company.find({userId});
        if(!company){
            return res.status(400).json({
                message: "Companies not found",
                success: false
            });
        };

        return res.status(201).json({
            message: "Companies fathed",
            success: true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const getCompanyById = async (req, res) => {
    try {
        
        const companyId = req.params;
        const company = await Company.findOne(companyId);
        if(!company){
            return res.status(400).json({
                message: "Comoany not found",
                success: true
            });
        };

        return res.status(200).json({
            message: "Company Fathed",
            company,
            success: false
        })

    } catch (error) {
        
    }
}

export const updateCompany = async (req, res) => {
    try {
        const {name, description, website, locaton} = req.body;
        const file = req.file;

        const updateData =  {name, description, website, locaton};
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new:true});

        if(!company){
            return res.status(400).json({
                message: "Company not found",
                success: false
            });
        };

        return res.status(200).json({
            messsage: "Company Information Updated",
            success: true
        })
    } catch (error) {
        console.log(error);
        
    }
}