import { TreeData } from "element-plus/es/components/tree/src/tree.type";
import { ClViewGroup, useViewGroup } from "/$/base";
import { service } from "/@/cool";
import Node from "element-plus/es/components/tree/src/model/node";
import ClAvatar from "../avatar/index";

export function useDeptViewGroup(options: DeepPartial<ClViewGroup.Options>) {
	const { ViewGroup } = useViewGroup({
		...options,
		service: service.base.sys.department,
		enableAdd: false,
		label: "员工列表",
		tree: {
			lazy: true,
			onLoad(node: Node, resolve: (data: TreeData) => void) {
				if (node.data.id) {
					service.base.sys.user.list({ departmentId: node.data.id }).then((res) => {
						res.forEach((e) => {
							e.isLeaf = true;
							e.icon = (
								<ClAvatar
									size={22}
									src={e.headImg}
									style={{ marginRight: "6px" }}
								/>
							);
						});
						res.unshift(...(node.data.children || []));

						resolve(res);
					});
				}
			}
		}
	});

	return {
		ViewGroup
	};
}
