const Products = require('../models/productModel')

//Filter, sorting and paginating
class APIfeatures {
    constructor(query, query_string) {
        this.query = query
        this.query_string = query_string
    }
    filter() {
        const obj_query = {...this.query_string }

        const filterBy = ['page', 'sort', 'limit']
        filterBy.forEach(element => delete(obj_query[element]))

        let str_query = JSON.stringify(obj_query)
        str_query = str_query.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

        this.query.find(JSON.parse(str_query))
        return this
    }
    sort() {
        if (this.query_string.sort) {
            const sortBy = this.query_string.sort.split(',').join(' ')
            console.log(sortBy)
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('createdAt')
        }
        return this
    }
    paging() {
        const page = this.query_string.page * 1 || 1
        const limit = this.query_string.limit * 1 || 30 ///Limit product in one page
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this
    }
}

const productCtrl = {
    getProducts: async(req, res) => {
        try {
            const features = new APIfeatures(Products.find(), req.query).filter().sort().paging()

            const products = await features.query
            res.json({
                status: 'success',
                result: products.length,
                products: products
            })
        } catch (err) {
            return res.status(400).json({ msg: err.message })
        }
    },
    createProduct: async(req, res) => {
        try {
            const { product_id, title, price, description, content, images, category, brand } = req.body
            if (!images) return res.status(400).json({ msg: "No image upload" })
            const product = await Products.findOne({ product_id })
            if (product)
                return res.status(400).json({ msg: "This product already exists" })
            const newProduct = new Products({
                product_id,
                title: title.toLowerCase(),
                price,
                description,
                content,
                images,
                category,
                brand
            })
            console.log("Create a product")
            await newProduct.save()
            res.json({ msg: "Create a product" })
        } catch (err) {
            return res.status(400).json({ msg: err.message })
        }
    },
    deleteProduct: async(req, res) => {
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.json({ msg: "Deleted a product" })
        } catch (err) {
            return res.status(400).json({ msg: err.message })
        }
    },
    updateProduct: async(req, res) => {
        try {
            const { title, price, description, content, images, category, brand } = req.body
            if (!images) return res.status(400).json({ msg: "No images uploaded" })
            await Products.findOneAndUpdate({ _id: req.params.id }, {
                title: title.toLowerCase(),
                price,
                description,
                content,
                images,
                category,
                brand
            })
            res.json({ msg: "Updated product" })
        } catch (err) {
            return res.status(400).json({ msg: err.message })
        }
    }
}

module.exports = productCtrl