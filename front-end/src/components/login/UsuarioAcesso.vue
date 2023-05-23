<template>
    <div class="usuario_acesso">
        <h2>Primeiro Acesso</h2>
        <br>
        <h4>Por questões de segurança e privacidade, por favor coloque o login e senha que deseja utilizar como administrador!</h4>
        <br>
        <button type="button" id="btnAjuda" class="btn btn-primary btn-floating" @click="ajuda()">
            <i class="fa fa-question-circle"></i>
        </button>
        <form class="row g-3">
            <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Nome de Usuário</label>
                <input type="text" class="form-control" v-model="nome" >
            </div>
            <div class="col-md-2">
                <label for="inputZip" class="form-label">Senha</label>
                <input type="password" class="form-control" id="inputZip" v-model="senha">
            </div>
            <div class="col-md-2">
                <label for="inputZip" class="form-label">Confirme a Senha</label>
                <input type="password" class="form-control" id="inputZip" v-model="senhaConfirm">
            </div>
            <div class="col-12">
                <button type="button" id="button" class="btn btn-primary" @click="atualizarUsuario()">CONFIRMAR</button>
            </div>
        </form>
    </div>
</template>

<script>

export default{
    name: 'UsuarioAcesso',
    data() {
        return{
            URL: "http://localhost:4000",
            nome: '',
            senha: '',
            senhaConfirm: '',
            usuarioAtual: '',
        }
    },
    methods: {
        atualizarUsuario(){
            if(this.senha != this.senhaConfirm)
                this.alerta()
            else{
                const user = {
                    usuarioAtual: this.usuarioAtual,
                    usuario_nome: this.nome,
                    usuario_senha: this.senha,
                }
                axios.put(`${this.URL}/primeiroacesso/`, user).then(response => {
                    window.location.href = '/home'
                });
            }
        },
        ajuda(){
            this.$swal.fire({
                title: '<h2>Primeiro acesso como administrador</h2>',
                icon: 'info',
                html:
                    '<h3 style="color:#4da6ff">Primeiro Acesso</h3>'+
                    '<b>IMPORTANTE </b><p>Por privacidade e segurança, siga os próximos passos!</p>' +
                    '<p><b>1- </b>Inserir todos os dados: Nome de usuário, Senha e confirmação de senha.'+
                    '<p><b>2- </b>Após todos dados inseridos clicar no botão "Confirmar" para salvar novo login e senha.'+
                    '<p><b>3- </b>Após a confirmação, seu novo acesso como administrador será o nome de login e senha escolhidos neste passo.'
            })
        },
        alerta(){
            this.$swal.fire({
                title: '<h2>Senha incompativel</h2>',
                icon: 'info',
                text: 'Senha e Confirmação de Senha incompativel! '
            })
        }
    },
    created(){
        let urlParams = new URLSearchParams(window.location.search);
        this.usuarioAtual = urlParams.get('usuario_nome'); 
        console.log(this.usuarioAtual);
    }
}
</script>

<style>

</style>