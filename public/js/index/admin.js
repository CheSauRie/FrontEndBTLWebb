

// Lấy danh sách sản phẩm và render ra màn hình
const getProductList = async () => {
    const res = await axios({
        method: "GET",
        url: `http://localhost:3001/api/v1/product/get-all-product`,
    });
    console.log(res.data);
    return res.data;
}

const renderProductList = async () => {
    const list = await getProductList();
    const contentHtml = list
        .map(
            (item, index) => `<div class="col" style="margin-right: 100px; margin-bottom:10px">
            <div class="card" style="width: 18rem;">
                <img src="${item.thumbnail}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <label>Tình trạng</label>
                    <p class="card-text">${item.status}</p>
                    <button onclick="handleDelete('${item.id}')" type="button" >Xóa</button>
                    <button onclick="handleUpdate('${item.id}')" type="button" data-bs-toggle="modal" data-bs-target="#update_product">Sửa</button>
                    <button onclick="handleUpload('${item.id}')" type="button" data-bs-toggle="modal" data-bs-target="#upload_product">Thêm ảnh</button>
                </div>
            </div>
        </div>`
        )

    document.getElementById("item_product").innerHTML = contentHtml;
};
renderProductList();



// Xử lí sự kiện thêm sản phẩm
const form = document.getElementById("form-add-product")
form.addEventListener("submit", async (e) => {
    let name = document.getElementById("name_product").value;
    let productLine_name = document.getElementById("productLine_name").value;
    let code = document.getElementById("code_product").value;
    let description = document.getElementById("description_product").value;
    let price = document.getElementById("price_product").value;
    const product = { name, code, productLine_name, price, description }
    e.preventDefault()
    await axios({
        method: "POST",
        url: `http://localhost:3001/api/v1/product/`,
        data: product,
    });
    await renderProductList()
})


//Xử lí sự kiện sửa trạng thái sản phẩm
let store = {
    productDetail: null,
};

const getProductDetail = async (id) => {
    const res = await axios({
        method: "GET",
        url: `http://localhost:3001/api/v1/product/get-detail-product/${id}`,
    });
    return res.data;
};
const updateProduct = async (id, status) => {
    const res = await axios({
        method: "PUT",
        url: `http://localhost:3001/api/v1/product/update-product/${id}`,
        data: {
            status
        },
    });
    return res.data;
};
const handleUpdate = async (id) => {
    const product = await getProductDetail(id);
    store.productDetail = product;
};
window.handleUpdate = handleUpdate;

document.getElementById("update-product").addEventListener("click", async (e) => {
    e.preventDefault()
    const status = document.getElementById("status_product").value;
    const { id } = store.productDetail;
    await updateProduct(id, status);
    await renderProductList();
});


// Xử lí sự kiện thêm ảnh 
const handleUpload = async (id) => {
    const product = await getProductDetail(id);
    console.log(product);
    store.productDetail = product;
};
window.handleUpload = handleUpload;
const uploadProduct = async (id, thumbnail) => {
    const res = await axios({
        method: "POST",
        url: `http://localhost:3001/api/v1/product/upload-image/${id}`,
        // data: {
        //     thumbnail
        // },
    });
    return res.data;
};

const deleteStudent = async (id) => {
    const res = await axios({
        method: "DELETE",
        url: `http://localhost:3001/api/v1/product/delete-product/${id}`,
    });
    return res.data;
};
const handleDelete = async (id) => {
    await deleteStudent(id);
    await renderProductList();

};
window.handleDelete = handleDelete;