<template>
  <div class="home">
    <h1>Nile shopping demo</h1>
    <p>You can browse stores, products and even buy them with iota tokens! It's 100% feeless!</p>
    <router-link to="/products">Discover Products!</router-link>
    <h2>
      Your connected to store:
      <strong>{{ shop.data.name }}</strong>
    </h2>
    <h3>Connect to another shop?</h3>
    <el-form :inline="true" :model="form">
      <el-form-item label="Fill in shop root">
        <el-input v-model="form.root" placeholder="Shop root address"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Change Shop</el-button>
      </el-form-item>
    </el-form>

    <div class="section section--use-case" id="use-cases">
      <div class="container">
        <el-row>
          <el-col :span="12">
            <h3 class="section-hero">Features</h3>
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item title="Discover local shops" name="1">
                <div>Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;</div>
                <div>Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.</div>
              </el-collapse-item>
              <el-collapse-item title="Buy online with same day delivery" name="2">
                <div>Operation feedback: enable the users to clearly perceive their operations by style updates and interactive effects;</div>
                <div>Visual feedback: reflect current state by updating or rearranging elements of the page.</div>
              </el-collapse-item>
              <el-collapse-item title="Privacy by design" name="3">
                <div>Simplify the process: keep operating process simple and intuitive;</div>
                <div>Definite and clear: enunciate your intentions clearly so that the users can quickly understand and make decisions;</div>
                <div>Easy to identify: the interface should be straightforward, which helps the users to identify and frees them from memorizing and recalling.</div>
              </el-collapse-item>
            </el-collapse>
          </el-col>
          <el-col :span="12">
            <img alt="vendor" src="../assets/customer-circled.jpg">
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      activeNames: ["1"],
      form: {
        root: ""
      }
    };
  },
  computed: {
    shop: function() {
      return this.$store.getters.getShopDetails;
    }
  },
  methods: {
    onSubmit() {
      console.log("submit!", this.form);
      this.$store.dispatch("fetchShopDetails", this.form.root).then(() => {
        console.log("new shop loaded");
      });
    },
    handleChange(val) {
      console.log(val);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: var(--secondary);
  text-decoration: none;
}

.container {
  width: 1200px;
  margin: 0 auto;
}

.section {
  padding: 100px 0;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  background-color: var(--white);
  &-hero {
    margin-bottom: 30px;
  }
  &__light {
    background-color: #f5f8fa;
  }
  &__dark {
    background-color: var(--dark);
    color: var(--white);
  }
  &__primary {
    background-image: linear-gradient(
      to right bottom,
      #0b5d9e,
      #0074a9,
      #0089ae,
      #2e9db0,
      #5ab0b2
    );
    color: var(--white);
  }
  &__secondary {
    background-image: linear-gradient(
      to right bottom,
      #139b48,
      #48a84f,
      #69b558,
      #86c263,
      #a2cf6f
    );
    color: var(--white);
  }
}

.section--use-case {
  img {
    width: 500px;
  }
  hr {
    border-color: rgba(0, 0, 0, 0.05);
  }
  .flex-end {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
  }
}

.section--use-case {
  img {
    border-radius: 100%;
  }
  color: var(--dark);
}
.el-collapse {
  border: none;
  margin-left: 40px;
  .el-collapse-item__wrap {
    border-bottom: none;
  }
  .el-collapse-item {
    background-color: transparent;
    margin-bottom: 30px;
    &__header {
      position: relative;
      border: none;
      font-size: 24px;
      font-weight: 700;
      background-color: transparent;
      i {
        display: none;
      }
    }
    &__content {
      font-size: 16px;
      line-height: 1.5;
    }
    .counter {
      position: absolute;
      left: -40px;
      height: 40px;
      width: 40px;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--dark);
      background-color: rgba(0, 0, 0, 0.05);
      transition: all 200ms ease-in-out;
    }
    &.is-active {
      .counter {
        background-color: #69bae8;
        color: var(--white);
      }
    }
  }
}
</style>