<!--
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-03-26 21:09:13
 * @LastEditTime: 2019-03-27 00:08:44
 -->
 <template>
  <div class="text-xs-center">
    <v-container light>
      <v-layout
        light
        justify-center
      >
        <v-flex xs12    >
          <v-card light>
            <v-card-text >
              <v-pagination
                v-model="page"
                :length="1"
                :total-visible="7"
                @input="input"
                @next="next"
                @previous="previous"
              ></v-pagination>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      page: 2
    };
  },
  methods: {
    input(event) {
      console.log(event);
    },
    next() {
    
    },
    previous(){
        
    }
  }
};
</script>
<style scoped>
.text-xs-center {
  width: 100%;
}
/deep/ button {
  outline: 0;
}
.v-card__text{
    display: flex;
    justify-content: center;
    align-items: center;
} 
 /deep/ .container{
    padding: 0
}
</style>
