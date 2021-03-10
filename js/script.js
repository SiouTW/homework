Vue.component('month', {
  template: `
<div class="month">
  <p>{{ currentYear }} / {{ num + 1 }}</p>
  <ul v-for="array in show">
  <li :class="{now:obj.now,notnow:obj.now===false}" v-for="obj in array "> {{ obj.num }} </li>
  </ul>
</div>`,
  props: ['num'],
  data() {
    return {
      currentYear: '',
      currentMonth: '',
      currentDay: '',
      // 幾年幾月幾號
      firstday: '',
      // 星期幾
      dayOfTheWeek: '',
      // 這個月有幾天
      daysOfThisMonth: '',
      // 存所有的日子
      datas: [],
      show: [],
      // 日曆上有幾周
      line: [],
      // 以下都是計算月曆的排列
      // 上個月的要顯示的幾天
      calculationLastWeekOfLastMonth: '',
      // 上個月有幾天
      calculationDaysOfLastMonth: '',
      calculationdayOfTheMonth: '',
      // k: 0,
      weeks: ["日", "一", "二", "三", "四", "五", "六"],
      // 在創星期時的i該有的長度
      ilength: '',
      // 這個月有幾行星期
      rowWeek: '',
      // 計算中的月份
      calculationMonth: '',
    }
  },
  methods: {
    setCalender(now) {
      // 今年
      this.currentYear = now.getFullYear();
      // 這個月
      this.currentMonth = now.getMonth();
      // 今天    PS:只有日是從1開始算的
      this.currentDay = now.getDate();
      // 今天的年月日
      this.firstday = this.currentYear + '-' + (this.currentMonth + 1) + '-' + this.currentDay;
      this.monthlyCalendar(this.num);
    },
    // 計算一整年的月曆表
    monthlyCalendar(cm) {
      // calculationMonth = cm

      // 得知這個月總共有幾天
      this.cMonth(cm);
      // 這個月一號是禮拜幾
      this.cDay(cm);

      // 上個月要從幾號開始 = 上個月有幾天 - 這個月是禮拜幾開始 + 1
      this.calculationLastWeekOfLastMonth = this.calculationDaysOfLastMonth - this.dayOfTheWeek + 1;

      // 開始堆上個月的日期
      for (let i = this.calculationLastWeekOfLastMonth; i <= this.calculationDaysOfLastMonth; i++) {
        const date = {};
        date.num = i;
        date.now = false;
        this.datas.push(date);
      }

      // 開始堆這個月的日期
      for (let i = 1; i <= this.daysOfThisMonth; i++) {
        const date = {};
        date.num = i;
        date.now = true;
        this.datas.push(date);
      }

      // 42-這個月天數-(計算的上個月有幾天-計算的上個月要出現的天數)+1
      for (let i = 1; i <= 42 - this.daysOfThisMonth - (this.calculationDaysOfLastMonth - this.calculationLastWeekOfLastMonth + 1); i++) {
        const date = {};
        date.num = i;
        date.now = false;
        this.datas.push(date);
      }

      // 計算i的長度
      this.rowWeek = this.calculationDaysOfLastMonth - this.calculationLastWeekOfLastMonth + this.daysOfThisMonth + 1;
      if (this.we === 28) {
        this.ilength = 4;
      } else if (this.rowWeek > 28 && this.rowWeek <= 35) {
        this.ilength = 5;
      } else {
        this.ilength = 6;
      }

      // 把上面計算的陣列都推到line
      let k = 0;
      for (let i = 0; i < this.ilength; i++) {
        let line = new Array();
        for (var j = 0; j < 7; j++) {
          line.push(this.datas[k++]);
        }
        this.show.push(line);
      }
      this.datas = []

    },
    cMonth(cm) {
      if (cm === 0 || cm == 7) {
        // 上個月和這個月都31天(1,8)
        this.daysOfThisMonth = 31;
        this.calculationDaysOfLastMonth = 31;
        return 31;
      } else if (cm === 1) {
        // 閏月，上個月31天
        this.daysOfThisMonth = this.leapYear;
        this.calculationDaysOfLastMonth = 31;
        return this.leapYear;
      } else if (cm === 3 || cm === 5 || cm === 8 || cm === 10) {
        // 這個月30天，上個月31天
        this.daysOfThisMonth = 30;
        this.calculationDaysOfLastMonth = 31;
        return 30;
      } else if (cm === 2) {
        this.daysOfThisMonth = 31;
        this.calculationDaysOfLastMonth = this.leapYear;
        return 31;
      } else {
        this.daysOfThisMonth = 31;
        this.calculationDaysOfLastMonth = 30;
        return 31;
      }
    },
    cDay(cm) {
      // 計算這個月第一天是禮拜幾
      this.calculationdayOfTheMonth = this.currentYear + '-' + (cm + 1) + '-1';
      this.dayOfTheWeek = new Date(this.calculationdayOfTheMonth).getDay()
    },
  },
  computed: {
    leapYear() {
      // 是否閏年
      if (!(this.currentYear % 4) && (this.currentYear % 100) || !(this.currentYear % 400)) {
        // 是閏年
        return 29;
      } else {
        return 28;
      }
    }
  },
  mounted() {
    this.setCalender(new Date());
  },
})

var vm = new Vue({
  el: '#index',
  data() {
    return {
      weeks: ["日", "一", "二", "三", "四", "五", "六"],
      currentYear: '',
      currentMonth: '',
      currentDay: '',
      calculationMonth: '',
    }
  },
  methods: {
    init(now) {
      // 今年
      this.currentYear = now.getFullYear();
      // 這個月
      this.currentMonth = now.getMonth();
      // 今天    PS:只有日是從1開始算的
      this.currentDay = now.getDate();
    },
  },
  created() {
    this.init(new Date())
  },
});