$(function () {
    // 渲染页面 数据
    const initArtCateList = () => {
        $.ajax({
            type: "GET",
            url: '/my/article/cates',
            success: (res) => {
                const htmlStr = template('tpl-table', res)
                $("tbody").empty().html(htmlStr)
            }
        })
    }
    // 添加类别
    const layer = layui.layer
    let indexAdd = null;
    $("#btnAddCate").on("click", () => {
        console.log(1);
        layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "添加文章分类",
            content: "ABC",
            content: $("#dialog-add").html(),
        })
    })
    // 通过代理监听 submit 事件
    $("body").on("submit", "#form-add", function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg("新增分类失败！");
                initArtCateList();
                layer.msg("新增分类成功！");
                layer.close(indexAdd);
            },
        });
    });

    // 编辑
    let indexEdit = null;
    $("tbody").on("click", ".btn-edit", function () {
        indexEdit = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "修改文章分类",
            content: $("#dialog-edit").html(),
        })
        const id = $(this).attr("data-id");
        //发起请求获取数据
        $.ajax({
            type: "GET",
            url: "/my/article/cates/" + id,
            success: (res) => {
                layui.form.val("form-edit", res.data)
            }
        })
    })

    // 更新数据
    $("body").on("submit", "#form-edit", function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg("更新数据失败");
                layer.msg("更新数据成功");
                layer.close(indexEdit)
                initArtCateList()


            }
        })
    })

    initArtCateList();
    // 删除文章分类
    $("tbody").on("click", ".btn-delete", function () {
        const id = $(this).attr("data-id");
        // 提示用户是否删除
        layer.confirm("确定删除吗？", { icon: 3, title: "提示" }, function (index) {
            $.ajax({
                method: "GET",
                url: "/my/article/deletecate/" + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg("删除分类失败！");
                    }
                    layer.msg("删除分类成功！");
                    layer.close(index);
                    initArtCateList();
                },
            });
        });
    });
})
