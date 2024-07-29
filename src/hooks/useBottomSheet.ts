import { create } from 'zustand';
import { AnimationControls } from 'framer-motion';

interface BottomSheetState {
	isOpen: boolean;
	controls?: AnimationControls;
	setControls: (controls: AnimationControls) => void;
	setIsOpen: (open: boolean) => void;
	onDragEnd: (info: any) => void;
}

const useBottomSheet = create<BottomSheetState>((set, get) => ({
	isOpen: false,
	controls: undefined,
	setControls: (controls: AnimationControls) => set({ controls }),
	setIsOpen: (open: boolean) => set({ isOpen: open }),
	onDragEnd: (info: any) => {
		const shouldClose =
			info.offset.y > 20 || (info.offset.y >= 0 && info.point.y > 45);
		const { controls } = get();

		if (controls) {
			if (shouldClose) {
				controls.start('hidden');
				set({ isOpen: false });
			} else {
				controls.start('visible');
				set({ isOpen: true });
			}
		}
	},
}));

export default useBottomSheet;
