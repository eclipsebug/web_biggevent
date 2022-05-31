$(function () {
    const form = layui.form;
    // 自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须是6到12位，且不能出现空格。"],
        samePwd: (val) => {
            if (val === $("[name=oldPwd]").val()) return "新旧密码不能相同"
        },
        rePwd: (val) => {
            if (val !== $("[name=newPwd]").val()) return "两次密码不一致！";
        },
    })
    // 更新数据
    $(".layui-form").on('submit', (e) => {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(".layui-form").serialize(),
            success: (res) => {
                console.log(res);
                if (res.status !== 0) return layer.msg("修改密码失败")
                // 修改
                localStorage.removeItem("token")
                window.parent.location.href = '/login.html'
            }
        })
    })
})