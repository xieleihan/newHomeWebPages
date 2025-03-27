<template>
    <div class="systemAccess">
        <el-row>
            <el-col :span="24">
                <el-radio-group v-model="radio">
                    <el-radio
                        value="1"
                        size="large"
                    >国内访问情况(含港澳台)</el-radio>
                    <el-radio
                        value="2"
                        size="large"
                    >世界访问情况</el-radio>
                </el-radio-group>
                <el-divider
                    direction="vertical"
                    border-style="dashed"
                />
            </el-col>
            <el-col
                v-show="radio === '1'"
                :span="24"
                style="display: flex;"
            >
                <div
                    id="china-map"
                    class="chinaMap"
                ></div>
                <div
                    class="list"
                    style="width: 50%;"
                    v-if="chinaDataList.length > 0"
                >
                    <el-table
                        :data="chinaDataList"
                        style="width: 100%;height: 65dvh;"
                        stripe
                    >
                        <el-table-column
                            prop="province"
                            label="省份"
                        ></el-table-column>
                        <el-table-column
                            prop="accessvalue"
                            label="访问量"
                        ></el-table-column>
                        <el-table-column label="操作">
                            <el-button>
                                查看详情
                            </el-button>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
            <el-col
                v-show="radio === '2'"
                :span="24"
            >
                <div
                    id="world-map"
                    class="worldMap"
                ></div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts';
import { china } from '../../utils/china.ts';
import { getChinaAccessList } from '../../api/request.ts';

const radio = ref('1')
const dataList = ref({
    list:{}
})
const chinaDataList = ref([])

function renderMap() {
    const chartDom = document.getElementById('china-map');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('china', china);

    const option = {
        tooltip: {
            formatter: (params: any) => {
                return `${params.seriesName}<br />${params.name}：${params.value || 0}`;
            },
        },
        visualMap: {
            min: 0,
            max: 1500,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'],
            inRange: {
                color: ['#fbf8f3', '#94d2a5'],
            },
            show: true,
        },
        geo: {
            map: 'china',
            roam: false,
            zoom: 1.23,
            label: {
                show: true,
                fontSize: 10,
                color: 'rgba(0,0,0,0.7)',
            },
            itemStyle: {
                normal: {
                    borderColor: 'rgba(0, 0, 0, 0.2)',
                },
                emphasis: {
                    areaColor: 'tomato',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 20,
                    borderWidth: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
            },
        },
        series: [
            {
                name: '信息量',
                type: 'map',
                geoIndex: 0,
                data: dataList.value,
            },
        ],
    };

    myChart.setOption(option);
}

onMounted(async () => {
    await getChinaAccessList({}).then((res: any) => {
        dataList.value = res.chinaDataList.map((item: any) => {
            return {
                ...item,
                value: item.accessvalue,
                name: item.province,
            };
        });
        chinaDataList.value = res.chinaDataList;
    });
    console.log(dataList.value);
    renderMap();
});

watch(radio, (val) => {
    if (val === '1') {
        renderMap();
    } else {
        console.log('世界地图');
    }
});
</script>

<style scoped lang="scss">
.systemAccess{
    width: 100%;
    height: 65dvh;
    min-height: 65dvh;
    .chinaMap{
        width: 50%;
        height: 65dvh;
        min-height: 65dvh;
    }
}
</style>