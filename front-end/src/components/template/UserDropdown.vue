<template>
    <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Administrador
        </button>
        <ul class="dropdown-menu">
            <router-link to="/admin">
                <li><a class="dropdown-item" href="#"><i class="fa fa-cogs"></i>  Administração</a></li>
            </router-link>
            <li><a class="dropdown-item" href="/"><i class="fa fa-sign-out"></i>  Sair</a></li>
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
    
</style>
