// 导入布局组件
import ComponentsLayout from "../../../../layout/ComponentsLayout";

function BookFlow() {
    return (
        <>
            <ComponentsLayout
                title="书库"
                isOpenPagination={false}
                container={
                    <>
                        <h3>图书流程</h3>
                        <p>图书流程图</p>
                    </>
                }
            ></ComponentsLayout>
        </>
    );
}

export default BookFlow;