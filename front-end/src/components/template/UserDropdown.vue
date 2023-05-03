<template>
    <div class="dropdown">
        <button id="btn" class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Administrador
        </button>
        <ul class="dropdown-menu">
            <router-link to="/admin">
                <li><a id="btn-line" class="dropdown-item" href="#"><i class="fa fa-cogs"></i>  Administração</a></li>
            </router-link>
            <li><a id="btn-line" class="dropdown-item" href="/"><i class="fa fa-sign-out"></i>  Sair</a></li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'UserDropdown',
    
 }
</script>

<style>
    #btn{
        background-color: rgb(66, 62, 4);
        color: rgb(251, 251, 176);
    }
    #btn:hover{
        background-color: rgb(112, 101, 5);
    }
    #btn-line{
        color: rgb(51, 47, 0);
        background-color: rgb(179, 161, 0);
    }
    #btn-line:hover{
        color: rgb(179, 161, 0);
        background-color: rgb(51, 47, 0);
    }
</style>
