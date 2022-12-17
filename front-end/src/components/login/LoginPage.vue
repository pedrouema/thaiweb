<template>
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
                                        v-model="usuario_admin" />
                                    <label class="form-label" for="typeEmailX">Usuário</label>
                                </div>
    
                                <div class="form-outline form-white mb-4">
                                    <input type="password" id="typePasswordX" class="form-control form-control-lg"
                                        v-model="senha_admin" />
                                    <label class="form-label" for="typePasswordX">Senha</label>
                                </div>
    
                                <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">Esqueceu sua senha?</a></p>
    
                                <button class="btn btn-outline-light btn-lg px-5" type="button" @click="getValido()">Entrar</button>
    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    name: 'LoginPage',
    data() {
        return{
            URL: "http://localhost:4000",
            admin: [],
            usuario_admin: '',
            senha_admin: '',
            valida_usuario:'',
            valida_senha:'',
            valido: false,
        }
    },
    //Continuar Aqui
    methods: {
        getValido(){
            axios.get(`${this.URL}/admins/`, admin).then(response => {
                const administrador = response.data[0]
                
                console.log(administrador);
                
            })
            
        },

        limpaDadosFormulario(){
            this.usuario_admin = '';
            this.senha_admin = '';
            this.valido = false;
        },
        
    }

}
</script>

<style>

</style>