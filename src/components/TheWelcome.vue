<script setup>
  import { useGroupingsStore } from '@/stores/groupings';
  import { onMounted, ref, watch} from 'vue';

  // components
  import AppointmentModalVue from './AppointmentModal.vue';



  const groupingStore = useGroupingsStore();
  const selectedGrouping = ref(null);
  const showAppointmentModal = ref(false);

  const doctorName = (str) => {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
  }

  onMounted(() => {
    selectedGrouping.value = groupingStore.groupings[0]
  })

  watch(selectedGrouping, (newSelectedGrouping) => {
    groupingStore.selected.group = newSelectedGrouping;
  })

  const toggleModal = () => {
    showAppointmentModal.value =!showAppointmentModal.value;
  }
</script>

<template>

  <!-- Specialist Component -->
  <div class="mb-4">
    <select name="specialist" v-model="selectedGrouping" id="specialist" class="form-select px-4 py-3 rounded-full max-w-md mx-auto w-full border-pink-200 focus:border-0 focus:ring-pink-400 focus:ring-offset-1 focus:ring-1 transition ease-in-out duration-300">
      <option :value="grouping" v-for="grouping in groupingStore.groupings" :key="grouping.tmgroupid">{{ grouping.tmgroupname }}</option>
    </select>
  </div>

  <div v-if="selectedGrouping && selectedGrouping.tmgroupid">
    <div class="">
      <TransitionGroup name="list" tag="div" class="flex items-center space-x-2 flex-nowrap overflow-auto py-2 px-2 mb-4">
        <div class="text-white font-medium px-2 py-3 bg-purple-400 rounded text-center flex-shrink-0" v-for="rs in selectedGrouping.rs" :key="rs.rsid">
          <a :href="`#hospital-${rs.rsid}`">
            {{ rs.hospital }}
          </a>
        </div>
      </TransitionGroup>
    </div>

    <div>
      <div v-for="rs in selectedGrouping.rs" :key="rs.rsid" :id="`hospital-${rs.rsid}`">
        <div class="p-2 mb-2">
          <h4 class="font-semibold mb-2 text-lg">{{ rs.hospital }}</h4>
          <div class="space-y-2">
            <div v-for="specialist in rs.specialist" :key="specialist.tmid">
              <table class="w-full border border-purple-300">
                <thead>
                  <th colspan="2" class="bg-purple-300 text-center text-white">{{ specialist.specialist }}</th>
                </thead>
                <tbody>
                  <tr v-for="doctor in specialist.doctors" :key="doctor.pid" class="border border-purple-300">
                    <td class="px-2 py-3 border w-1/2">
                      {{ doctorName(doctor.dokter) }}
                    </td>
                    <td class="px-2 py-3 border" align="center">
                      <button class="bg-purple-300 px-3 py-2 text-white" @click="toggleModal">Get Appointments</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>




  <AppointmentModalVue :is-show="showAppointmentModal" @close="showAppointmentModal = false"></AppointmentModalVue>
</template>

<style>
  .list-enter-active,
  .list-leave-active,
  .list-move {
    transition: 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
    transition-property: opacity, transform;
  }

  .list-enter {
    opacity: 0;
    transform: translateX(50px) scaleY(0.5);
  }

  .list-leave-active {
    position: absolute;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
</style>