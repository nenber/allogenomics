<template>
  <el-row
    class="center-content"
    :gutter="20"
  >
    <el-col
      :span="8"
      class="card-column"
    >
      <el-card
        shadow="hover"
        class="custom-card"
        @click="emitCardClick(true)"
      >
        <div class="card-content">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#666666"
          >
            <path d="M520-40q-73 0-116.5-61T360-240q0-78 43.5-139T520-440q73 0 116.5 61T680-240q0 78-43.5 139T520-40ZM178-68l-76-24q31-94 44.5-191.5T160-480q0-99-13.5-196.5T102-868l76-24q33 100 47.5 203T240-480q0 106-14.5 209T178-68Zm604 0q-33-100-47.5-203T720-480q0-106 14.5-209T782-892l76 24q-31 94-44.5 191.5T800-480q0 99 13.5 196.5T858-92l-76 24Zm-262-52q40 0 60-37.5t20-82.5q0-45-20-82.5T520-360q-40 0-60 37.5T440-240q0 45 20 82.5t60 37.5Zm-31-48q9 8 21 8t21-9q14-14 21.5-32.5T560-240q0-20-7-38.5T532-311q-8-9-20.5-9t-21.5 8q-9 8-9.5 21t7.5 22l6 8.5q6 8.5 6 20.5t-6 20.5l-6 8.5q-9 9-8.5 22t9.5 21Zm-49-352q-73 0-116.5-61T280-720q0-78 43.5-139T440-920q73 0 116.5 61T600-720q0 78-43.5 139T440-520Zm0-80q40 0 60-37.5t20-82.5q0-45-20-82.5T440-840q-40 0-60 37.5T360-720q0 45 20 82.5t60 37.5Zm30-48q9-8 9.5-21t-7.5-22q-5-6-8.5-13.5T460-720q0-8 3.5-15.5T472-749q8-9 8-21.5t-9-21.5q-9-8-21-8t-21 9q-14 14-21.5 32.5T400-720q0 20 7 38.5t21 32.5q9 9 21 9t21-8Zm-30-72Zm80 480Z" />
          </svg>
          <h2>
            Haematopoietic stem cell transplantation
          </h2>
        </div>
      </el-card>
    </el-col>

    <el-col
      :span="8"
      class="card-column"
    >
      <el-card
        shadow="hover"
        class="custom-card"
        @click="emitCardClick(false)"
      >
        <div class="card-content">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#666666"
          >
            <path d="M360-120v-167q-10 4-19.5 5.5T320-280q-100 0-170-70T80-520v-80q0-100 70-170t170-70q50 0 85 35t35 85q0 50-35 85t-85 35h-80v-80h80q17 0 28.5-11.5T360-720q0-17-11.5-28.5T320-760q-66 0-113 47t-47 113v80q0 66 47 113t113 47q17 0 28.5-11.5T360-400q0-17-11.5-28.5T320-440h-80v-80h80q50 0 85 35t35 85v280h-80Zm160 0v-280q0-50 35-85t85-35h80v80h-80q-17 0-28.5 11.5T600-400q0 17 11.5 28.5T640-360q66 0 113-47t47-113v-80q0-66-47-113t-113-47q-17 0-28.5 11.5T600-720q0 17 11.5 28.5T640-680h80v80h-80q-50 0-85-35t-35-85q0-50 35-85t85-35q100 0 170 70t70 170v80q0 100-70 170t-170 70q-11 0-20.5-1.5T600-287v167h-80ZM160-520v-80 80Zm640-80v80-80Z" />
          </svg>
          <h2>
            Solid organ transplantation
            <br>
            <br>
          </h2>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";

const emit = defineEmits(["card-transplantation-clicked"]);

const emitCardClick = (cardType: boolean) => {
  emit("card-transplantation-clicked", cardType);
};
</script>

<style scoped>
.center-content {
  display: flex;
  align-items: stretch; /* Assure que les colonnes s'étendent sur la même hauteur */
}

.card-column {
  display: flex;
  flex-direction: column;
}

.custom-card {
  cursor: pointer;
  text-align: center;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Permet à la carte de s'étendre pour remplir la colonne */
  width: 100%;
}

.custom-card:hover {
  transform: translateY(-10px);
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}

:deep(.el-card__body) {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>