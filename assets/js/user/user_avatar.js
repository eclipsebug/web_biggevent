$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    // 模拟点击上传
    $("#btnChooseImage").on('click', () => {
        $('#file').click()
    })
    // change事件   
    const layer = layui.layer;

    $("#file").on('change', (e) => {
        // console.log(e);
        const fileLength = e.target.files.length
        if (fileLength === 0) return;
        // 拿到用户上传的文件
        const file = e.target.files[0];
        // 转化图片的路径
        const imgUrl = URL.createObjectURL(file)

        // 重新初始化裁剪图片区域
        $image
            .cropper("destroy") // 销毁旧的裁剪区域
            .attr("src", imgUrl) // 重新设置图片路径
            .cropper(options); // 重新初始化裁剪区域
    })

    // 上传头像
    $("#btnUpload").on('click', () => {
        const dataURL = $image.cropper("getCroppedCanvas", {
            // 创建一个 Canvas 画布
            width: 100,
            height: 100,
        })
            .toDataURL("image/png");
        $.ajax({
            type: "POST",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL,
            },
            success: (res) => {
                if (res.status !== 0) return layer.msg('上传失败')
                layer.msg('上传成功')
                window.parent.getUserInfo();
            }

        })
    })
})