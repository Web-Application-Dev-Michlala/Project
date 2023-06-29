const getProduct = async (req,res) => {
    const product = await productService.getProductByName(req.params.categoryName,req.params.productId);
    if(product) {
        res.status(200).json(product);
    } else {
        res.status(500).json({ error: 'An error occurred while trying to get the product' });
    }

}