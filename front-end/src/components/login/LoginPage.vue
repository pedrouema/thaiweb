<template>
    <div>
        <section class="vh-100 gradient-custom">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div class="card bg-dark text-white" style="border-radius: 1rem;">
                            <div class="card-body p-5 text-center">
                                <div class="mb-md-5 mt-md-4 pb-5">
                                    <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                                    <p class="text-white-50 mb-5">Por favor, entre com seu nome de usuário e senha!</p>
                                    <div class="form-outline form-white mb-4">
                                        <input type="text" id="typeEmailX" class="form-control form-control-lg"
                                            v-model="nome_usuario" />
                                        <label class="form-label" for="typeEmailX">Usuário</label>
                                    </div>
                                    <div class="form-outline form-white mb-4">
                                        <input type="password" id="typePasswordX" class="form-control form-control-lg"
                                            v-model="senha_usuario" />
                                        <label class="form-label" for="typePasswordX">Senha</label>
                                    </div>
                                    <button class="btn btn-outline-light btn-lg px-5" type="button" @click="login()">Entrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>  
</template>

<script>


export default {
    name: 'LoginPage',
    data() {
        return{
            URL: "http://localhost:4000",
            nome_usuario: '',
            senha_usuario: '',
        }
    },
    methods: {
        login() {
            const usuario = {
                usuario_nome: this.nome_usuario,
                usuario_senha: this.senha_usuario
            }
            axios.post(`${this.URL}/login`, usuario).then(response => {
                console.log(response.data);
                if(response.data.success){
                    localStorage.setItem('token', response.data.token)
                    if(!response.data.acesso)
                        window.location.href = '/primeiroacesso?usuario_nome='+response.data.usuario_nome
                    else
                        window.location.href = '/home'
                }
                else{
                    this.alertaLogin();
                }
            });
        },
        alertaLogin(){
            this.$swal.fire({
                title: '<h2>Falha de acesso!</h2>',
                icon: 'error',
                text: 'Verifique seu nome de usuario e senha!'
            })
        }
    },

}
</script>

<style>

</style>