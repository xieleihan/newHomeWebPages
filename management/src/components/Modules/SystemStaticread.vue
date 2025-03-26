<template>
    <div class="staticFile">
        <div class="contentBox">
            <div class="left">
                <div
                    ref="chartRef"
                    id="nightingale"
                    style="width: 100%;height: 100%;"
                ></div>
            </div>
            <div class="right">
                <el-table
                    :data="tableArray"
                    style="width: 100%;height: 100%;"
                    height="100%"
                    stripe
                >
                    <el-table-column
                        prop="fileName"
                        show-overflow-tooltip
                        label="文件名"
                    ></el-table-column>
                    <el-table-column
                        prop="createdTime"
                        show-overflow-tooltip
                        label="创建时间"
                    ></el-table-column>
                    <el-table-column
                        prop="size"
                        show-overflow-tooltip
                        label="文件大小"
                    ></el-table-column>
                    <el-table-column label="访问">
                        <template #default="{ row }">
                            <a
                                :href="row.openUrl"
                                target="_blank"
                            >
                                <el-button>访问
                                </el-button>
                            </a>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { getCountFileType } from '../../api/request';

const resObject = ref<any>({});
const chartRef = ref<HTMLElement | null>(null);
let myChart: echarts.ECharts | null = null;
const tableArray = ref<any[]>([]); // 表格数组

onMounted(async () => {
    await getCountFileType({}).then((res: any) => {
        resObject.value = res;
        tableArray.value = res.data.fileDetails
    });

    await nextTick();

    setTimeout(() => {
        initChart();
    }, 100);
});

const initChart = () => {
    if (!chartRef.value) return;

    if (!myChart) {
        myChart = echarts.init(chartRef.value);
    }

    const arr = Object.entries(resObject.value.data?.fileCounts || {}).map(([key, value]) => ({
        value,
        name: key
    }));

    const option = {
        // 标题
        title: {
            text: '静态资源文件分布',
            subtext: '抽取自后端静态文件',
            left: 'center'
        },
        // 提示框
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // 图例
        legend: {
            left: 'center',
            top: 'bottom',
            // resObject.value中的.fileCounts的key名

            data: Object.keys(resObject.value.data.fileCounts)
        },
        // 工具箱
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        // 系列
        series: [
            {
                name: 'Area Mode',
                type: 'pie',
                radius: [20, 140],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 5
                },
                data: arr
            }
        ]
    };

    myChart.setOption(option);
    window.addEventListener('resize', () => myChart?.resize());
};

const resizeChart = () => {
    nextTick(() => {
        myChart?.resize();
    });
};

defineExpose({ resizeChart });
</script>


<style scoped lang="scss">
.staticFile {
    width: 100%;
    height: 62dvh;

    .contentBox {
        height: 62dvh;
        width: 100%;
        display: flex;

        .left,
        .right {
            width: 50%;
            height: 62dvh;
        }
    }
}
</style>