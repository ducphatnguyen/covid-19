import { ref, onBeforeUnmount } from 'vue';
import moment from 'moment';

const currentDateTime = ref<string>('');
const intervalId = ref<number>(0);

const updateDateTime = () => {
    currentDateTime.value = moment().format('DD/MM/YYYY hh:mmA');
};

intervalId.value = setInterval(updateDateTime, 1000);

onBeforeUnmount(() => {
    clearInterval(intervalId.value);
});

export { currentDateTime };
