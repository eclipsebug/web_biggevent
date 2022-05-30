$(function () {
    //点击切换登录和注册
    $("#link_reg").click(() => {
        $(".login-box").hide();
        $(".reg-box").show()
    })
    $("#link_login").click(() => {
        $(".login-box").show();
        $(".reg-box").hide()
    })

    const form = layui.form
    const layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须是6到12位，且不能出现空格"],
        repwd: (value) => {
            const pwd = $("#form_reg [name=repassword]").val();
            if (pwd !== value) return "两次输入的密码不一致"

        }
    })
    // 注册
    // const baseUrl = "http://www.liulongbin.top:3007";
    $("#form_reg").on("submit", (e) => {
        //阻止默认行为
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: baseUrl + "/api/reguser",
            data: {
                username: $("#form_reg [name=username]").val(),
                password: $("#form_reg [name=password]").val(),
            },
            success: (res) => {
                if (res.status !== 0) return layer.msg("注册失败")
                layer.msg("注册成功")
                $("#link_login").click()
            }
        })
    })
    // 登录
    $("#form_login").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: baseUrl + "/api/login"
            //将表单内容序列化成一个字符串。
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg("登录失败")
                layer.msg("登录成功")
                // 本地存储 token
                localStorage.setItem("token", res.token);
                console.log(res.token);
                location.href = "/index.html"
            }
        })
    })
})