const Productmodel = require('../models/Productschema');

const createProduct = async (req, res) => {
    try {
        const data = req.body;
        if (Array.isArray(data)) {
            const createproducts = await Productmodel.insertMany(data);

            return res.status(201).json({
                success: true,
                message: "All products are created",
                products: createproducts
            })
        }

        const singleproduct = await Productmodel.create({
            ...req.body,
            createdBy: req.user.id
        });

        await singleproduct.save()

        res.status(201).json({
            success: true,
            message: 'Product created',
            product: singleproduct
        })

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
};

//view all
const getproducts = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 3;
        const skip = (page - 1) * limit;

        const totalproducts = await Productmodel.countDocuments({
            createdBy: req.user.id
        })

        const allproduct = await Productmodel.find({
            createdBy: req.user.id
        }).skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            message: 'all products found',
            allproduct: allproduct,
            currentpage: page,
            totalPages: Math.ceil(totalproducts / limit),
            totalproducts
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

const updateproduct = async (req, res) => {
    try {
        const id = req.params.id;
        const {
            productName,
            category,
            price,
            stock,
            description
        } = req.body;

        const update = await Productmodel.findByIdAndUpdate(
            {
                _id: id,
                createdBy: req.user.id
            },
            {
                productName,
                category,
                price,
                stock,
                description
            },
            {
                new: true,
                runValidators: true
            }
        )
        
        if (!update) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Updated successfully",
            updated: update
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}
const getsingleproduct = async (req, res) => {
    try {

        const id = req.params.id;

        const product = await Productmodel.findOne({
            _id: id,
            createdBy: req.user.id
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            product
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};



//delete
const deleteproduct = async (req, res) => {
    try {
        const id = req.params.id;

        const deletenow = await Productmodel.findOneAndDelete({
            _id: id,
            createdBy: req.user.id
        });

        if (!deletenow) {
            return res.status(404).json({
                success: false,
                message: 'It doesnt exists'
            })
        }

        res.status(200).json({
            message: 'Deleted succesfully',
            Deletedproduct: deletenow
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}


module.exports = { createProduct, getsingleproduct ,  getproducts, updateproduct, deleteproduct };