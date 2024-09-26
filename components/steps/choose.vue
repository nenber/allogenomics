<template>
  <el-row class="card-row">
    <el-col :span="8">
      <el-card shadow="hover" class="custom-card" @click="emitCardClick(true)">
        <div class="card-content">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="40px"
            fill="#434343"
          >
            <path
              d="M480-619.33 349.33-750 480-880.67 610.67-750 480-619.33ZM40-160v-160q0-30.67 21.5-52t51.83-21.33H251q18 0 34.33 9 16.34 9 27.34 24.66 29 41 73.16 63.67Q430-273.33 480-273.33q50.33 0 94.5-22.67t73.5-63.67q11.67-15.66 27.5-24.66t33.5-9h137.67q30.66 0 52 21.33Q920-350.67 920-320v160H653.33v-109.67q-35.66 30.34-80.16 46.67-44.5 16.33-93.17 16.33-48.33 0-92.67-16.5Q343-239.67 306.67-270v110H40Zm120-293.33q-46.67 0-80-33.34-33.33-33.33-33.33-80 0-47.66 33.33-80.5Q113.33-680 160-680q47.67 0 80.5 32.83 32.83 32.84 32.83 80.5 0 46.67-32.83 80-32.83 33.34-80.5 33.34Zm640 0q-46.67 0-80-33.34-33.33-33.33-33.33-80 0-47.66 33.33-80.5Q753.33-680 800-680q47.67 0 80.5 32.83 32.83 32.84 32.83 80.5 0 46.67-32.83 80-32.83 33.34-80.5 33.34Z"
            />
          </svg>
          <h2>Allogenomics insights into one donor/recipient pair</h2>
        </div>
      </el-card>
    </el-col>

    <el-col :span="8">
      <el-card shadow="hover" class="custom-card" @click="emitCardClick(false)">
        <div class="card-content">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="40px"
            fill="#434343"
          >
            <path
              d="M40-160v-160q0-30.67 21.5-52t51.83-21.33H251q18 0 34.33 9 16.34 9 27.34 24.66 29 41 73.16 63.67Q430-273.33 480-273.33q50.33 0 94.5-22.67t73.5-63.67q11.67-15.66 27.5-24.66t33.5-9h137.67q30.66 0 52 21.33Q920-350.67 920-320v160H653.33v-109.67q-35.66 30.34-80.16 46.67-44.5 16.33-93.17 16.33-48.33 0-92.67-16.5Q343-239.67 306.67-270v110H40Zm440-166.67q-36 0-69-16.83T357-390q-16.33-23.67-39.83-37.83-23.5-14.17-50.84-17.5Q293-477.67 358-495.5t122-17.83q57 0 122.33 17.83 65.34 17.83 92 50.17-27 3.33-50.66 17.5-23.67 14.16-40 37.83Q583-360 550-343.33q-33 16.66-70 16.66ZM160-453.33q-46.67 0-80-33.34-33.33-33.33-33.33-80 0-47.66 33.33-80.5Q113.33-680 160-680q47.67 0 80.5 32.83 32.83 32.84 32.83 80.5 0 46.67-32.83 80-32.83 33.34-80.5 33.34Zm640 0q-46.67 0-80-33.34-33.33-33.33-33.33-80 0-47.66 33.33-80.5Q753.33-680 800-680q47.67 0 80.5 32.83 32.83 32.84 32.83 80.5 0 46.67-32.83 80-32.83 33.34-80.5 33.34Zm-320-120q-46.67 0-80-33.34-33.33-33.33-33.33-80 0-47.66 33.33-80.5Q433.33-800 480-800q47.67 0 80.5 32.83 32.83 32.84 32.83 80.5 0 46.67-32.83 80-32.83 33.34-80.5 33.34Z"
            />
          </svg>
          <h2>Allogenomics insights into <b>one</b> cohort</h2>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";

const emit = defineEmits(["card-clicked"]);

const emitCardClick = (cardType: boolean) => {
  emit("card-clicked", cardType);
};
</script>

<style scoped>
.card-row {
  display: flex;
  justify-content: center;
  gap: 20px;
  height: 100%;
}

.el-col {
  flex: 0 0 auto;
  max-width: 300px; /* Adjust this value to control the maximum width of the cards */
}

.custom-card {
  cursor: pointer;
  text-align: center;
  transition: transform 0.3s ease;
  height: 100%;
}

.custom-card:hover {
  transform: translateY(-10px);
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
}

svg {
  margin-bottom: 20px;
}

h2 {
  margin: 0;
  font-size: 1.2em;
  line-height: 1.4;
}

:deep(.el-card__body) {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
