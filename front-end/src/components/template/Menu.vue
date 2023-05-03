<template>
    <aside class="menu" v-show="isMenuVisible">
        <div>
            <br>
            <img src="@/assets/akb-logo.png" class="img-fluid" alt="..."><a href="/home"></a>
            <ul>
                <li>
                    <a href="/home">
                        <span class="icon"><i class="fa fa-home"></i></span>
                        <span class="item">Home</span>
                    </a>
                </li>
                <li>
                    <a href="/admin">
                        <span class="icon"><i class="fa fa-list-alt"></i></span>
                        <span class="item">Cadastros</span>
                    </a>
                </li>
                <li>
                    <a href="/cronograma">
                        <span class="icon"><i class="fa fa-calendar"></i></span>
                        <span class="item">Cronograma</span>
                    </a>
                </li>
                <li>
                    <a href="/financeiro">
                        <span class="icon"><i class="fa fa-money"></i></span>
                        <span class="item">Financeiro</span>
                    </a>
                </li>
                <li>
                    <a href="/analises">
                        <span class="icon"><i class="fa fa-bar-chart "></i></span>
                        <span class="item">Análises</span>
                    </a>
                </li>
            </ul>
        </div>
    </aside>
    
</template>

<script>
import { mapState } from 'vuex'


export default {
    name: 'Menu',
    computed: mapState(['isMenuVisible']),
}
</script>

<style>
    .menu {
        grid-area: menu;
        background: linear-gradient(to right, #0f1000, #3b3601);

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

    }

    ul li a{
        display: block;
        padding: 13px 30px;
        border-bottom: 1px solid #958b00;
        color: rgb(255, 242, 3);
        font-size: 18px;
        position: relative;
    }

    ul li a .icon{
        color: #e7d700;
        width: 30px;
        display: inline-block;
    }

    ul li a:hover,

    ul li a.active{
        color: #000000;

        background:rgb(167, 167, 0);
        border-right: 2px solid rgb(45, 46, 0);
    }

    ul li a:hover .icon,
    ul li a.active .icon{
        color: #353700;
    }
    
    ul li a:hover:before,
    ul li a.active:before{
        display: block;
    }
</style>
