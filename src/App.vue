<template>
  <div id="app" class="d-flex flex-column h-100" style="background-color: #449182">
    <!-- header area -->
  
    <!-- body area -->
    <!-- <div class="container flex-grow-1 bodyArea"> -->
      <div class="mt-1">
        <router-view />
        <div class="pageBottom"></div>
      </div>
    <!-- </div> -->
    <!-- footer area -->
    
  </div>
</template>

<script>


export default {
  data() {
      return {
        
      }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');

*{
  font-family: 'Open Sans', sans-serif;
}

.white-text{
  color:white;
}

.light-background{
  background-color:#90e0d1;
}
.light-color{
  color:#90e0d1
}
.dark-color{
  color: #449182
}
.dark-background{
  background-color:#449182;
}
</style>


