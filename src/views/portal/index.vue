<template>
  <div class="portal">
    <div class="portal-container">
      <!-- <keep-alive> -->
      <router-view></router-view>
      <!-- </keep-alive> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Portal',
  components: {},
  computed: {

  },
  data() {
    return {};
  },
  mounted() { },
  methods: {},
});
</script>

<style lang="less">
.portal {
  overflow: hidden;
  // &-container {
  //   margin-top: @headerH;
  //   height: calc(100vh - @headerH);
  //   overflow: auto;
  // }
}
.body-portal {
  .my-checkbox {
    display: inline-block;
    position: relative;
    cursor: pointer;
    top: 0;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    box-sizing: border-box;
    width: 16px;
    height: 16px;
    margin-right: 6px;
    background-color: #fff;
    vertical-align: middle;
    z-index: 1;
    transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
      background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
    &:after {
      box-sizing: content-box;
      content: "";
      border: 1px solid #fff;
      border-left: 0;
      border-top: 0;
      height: 7px;
      left: 5px;
      position: absolute;
      top: 2px;
      transform: rotate(45deg) scaleY(0);
      width: 3px;
      transition: transform 0.15s ease-in 0.05s;
      transform-origin: center;
    }
    &.checked {
      background-color: @primary;
      border-color: @primary;
      &:after {
        transform: rotate(45deg) scaleY(1);
      }
    }
    &:hover {
      border-color: @primary;
    }
  }
  .tips {
    color: #999;
    font-size: 12px;
  }
  .el-icon-close {
    cursor: pointer;
  }
  .el-message {
    margin-top: @headerH;
  }
  .el-button {
    &--small,
    &--small.is-round {
      padding: 9px 18px;
    }
    &--mini,
    &--mini.is-round {
      padding: 7px 12px;
    }
    &--primary {
      background: @primary !important;
      color: #fff !important;
      &:hover,
      &:focus {
        // background: #132E67;
      }
    }
    &--primary-white {
      color: @primary;
      border-color: @primary;
      &:hover,
      &:focus {
        border-color: #0048d6;
        color: #0048d6;
      }
    }
    &--default {
    }
    &--text {
      color: @primary;
      &:hover,
      &:focus {
        color: #132e67;
      }
    }
  }
  .el-table {
    color: #152026;
    &--mini {
      font-size: 12px;
    }
    &--small {
      font-size: 14px;
      .el-table__cell {
        padding: 5px 0;
      }
    }
    .cell {
      text-align: center;
    }
    td,
    th.is-leaf {
      border-bottom: 1px solid #ebebeb;
    }
    thead {
      color: #152026;
      text-align: left;
      font-weight: 700;
      tr,
      th {
        background-color: #ebebeb;
      }
    }
  }
  .el-tabs {
    &__item.is-active {
      color: @primary;
    }
    &__active-bar {
      background-color: @primary;
    }
  }
  .el-loading-spinner {
    transform: translateY(-50%);
    margin-top: 0;
    .path {
      stroke: @primary;
    }
    .el-loading-text {
      color: @primary;
    }
  }
  .el-pagination {
    text-align: center;
    .el-pagination__total {
      margin-right: 2px;
      font-size: 12px;
      font-weight: bold;
    }
    button {
      min-width: 10px;
      padding: 0 4px;
      &:hover {
        background: @primary !important;
        color: #ffffff !important;
      }
    }
    .el-pager {
      li {
        &.active,
        &:hover {
          background: @primary !important;
          color: #ffffff !important;
        }
      }
    }
  }
  .el-switch.is-checked .el-switch__core {
    border-color: @primary;
    background-color: @primary;
  }
  .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    border-color: @primary;
    background-color: @primary;
  }
  .el-switch__label.is-active {
    color: @primary;
  }
  .el-dropdown-menu {
    box-shadow: @boxSd !important;
  }
  .el-dropdown-link {
    display: inline-block;
    cursor: pointer;
  }
  .el-form {
    .el-select,
    .el-date-editor {
      width: 100%;
    }
    .el-form-item__error {
      padding-top: 0;
    }
    .el-form-item {
      // margin-bottom: 12px;
    }
    .el-cascader {
      width: 100%;
    }
  }
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: @primary;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: @primary;
    border-color: @primary;
  }

  // 弹框
  .el-overlay {
    // z-index: 8003 !important;
    .el-overlay-dialog {
      display: flex;
      align-items: center;
      justify-content: center;
      .el-dialog {
        display: flex;
        flex-direction: column;
        margin: 0 !important;
        background: transparent;
        max-height: 100%;
        max-width: 100%;

        .el-dialog__header {
          background: @primary;
          padding: 0;
          height: 42px;
          line-height: 42px;
          .el-dialog__title {
            font-size: 16px;
            color: #fff;
            float: left;
            line-height: 40px;
            padding-left: 16px;
          }
          .el-dialog__headerbtn {
            top: 10px;
            right: 16px;
          }
          .el-dialog__close {
            color: #fff;
            font-size: 22px;
            &:hover {
              color: #fff;
            }
          }
        }
        .el-dialog__body {
          color: #333;
          padding: 15px;
          background-color: #fff;
          overflow: auto;
        }
        .el-dialog__footer {
          background-color: #fff;
          text-align: right;
          padding: 10px 20px 16px;
        }
      }
    }
  }
}
// @media screen and (max-width: 1367px) {
//   .portal {
//     &-container {
//       margin-top: 46px;
//       height: calc(100vh - 46px);
//     }
//   }
// }
</style>
