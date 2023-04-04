

// Lấy danh sách sản phẩm và render ra màn hình
const getUserlist = async () => {
    const res = await axios({
        method: "GET",
        url: `http://localhost:3001/api/v1/admin/get-all-account`,
    });
    console.log(res.data);
    return res.data;
};
const getUserDetail = async (id) => {
    const res = await axios({
        method: "GET",
        url: `http://localhost:3001/api/v1/admin/get-detail-account/${id}`,
    });
    return res.data;
};
const updateUser = async (id, user) => {
    const res = await axios({
        method: "PUT",
        url: `http://localhost:3001/api/v1/admin/update-account/${id}`,
        data: user,
    });
    return res.data;
};
const deleteUser = async (id) => {
    const res = await axios({
        method: "DELETE",
        url: `http://localhost:3001/api/v1/admin/delete-account/${id}`,
    });
    return res.data;
};


let storeAccount = {
    accountDetail: null,
};


const renderUserList = async () => {
    const list = await getUserlist();
    const contentHtml = list
        .map(
            (item, index) => `<tr>
            <th scope="row">${index += 1}</th>
            <td>${item.code}</td>
            <td>${item.username}</td>
            <td>${item.email}</td>
            <td>${item.password}</td>
            <td>${item.role}</td>
            <td>${item.phone}</td>
            <td>${item.address}</td>
            <td>
                <button onclick="handleDeleteUser("${item.id}")">Xóa</button>
                <button onclick="handleUpdateUser("${item.id}")" data-bs-toggle="modal"
                data-bs-target="#add_user">Sửa</button>
            </td>
        </tr>`
        )

    document.getElementById("tbody-user").innerHTML = contentHtml;
};
renderUserList();



const handleUpdateUser = async (id) => {
    document.getElementById("addUser").style["display"] = "none";
    document.getElementById("updateUser").style["display"] = "block";
    const account = await getUserDetail(id);
    document.getElementById("code").value = account.code;
    document.getElementById("username").value = account.username;
    document.getElementById("email").value = account.email;
    document.getElementById("password").value = account.password;
    document.getElementById("address").value = account.address;
    document.getElementById("role").value = account.role;
    document.getElementById("phone").value = account.phone;
    storeAccount.accountDetail = account;
    console.log("handleUpdateUser");
};
window.handleUpdateUser = handleUpdateUser;

document.getElementById("btnModalUser").addEventListener("click", () => {

    document.getElementById("addUser").style["display"] = "block";
    document.getElementById("updateUser").style["display"] = "none";
    document.getElementById("code").value = "";
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("address").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("role").value = "";
    console.log("modalUser");
});


document.getElementById("addUser").addEventListener("click", async (e) => {
    let code = document.getElementById("code").value;
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let address = document.getElementById("address").value;
    let phone = document.getElementById("phone").value;
    let role = document.getElementById("role").value;
    const user = { code, username, email, password, address, role, phone }
    e.preventDefault()
    console.log(user);
    await axios({
        method: "POST",
        url: `http://localhost:3001/api/v1/admin/register`,
        data: user,
    });
    await renderUserList()

    console.log("addUser");
})

document.getElementById("updateUser").addEventListener("click", async (e) => {
    e.preventDefault()
    let code = document.getElementById("code").value;
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let address = document.getElementById("address").value;
    let phone = document.getElementById("phone").value;
    let role = document.getElementById("role").value;
    const user = { code, username, email, password, address, role, phone }
    console.log(user);
    const { id } = storeAccount.accountDetail;
    await updateUser(id, user);
    await renderUserList();

    console.log("update cs");
});

const handleDeleteUser = async (id) => {
    await deleteUser(id);
    await renderUserList();
    console.log("delete oke");
};
window.handleDeleteUser = handleDeleteUser;