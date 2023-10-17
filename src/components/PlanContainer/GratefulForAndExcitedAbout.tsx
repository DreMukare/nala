import { observer } from 'mobx-react';
import ContentEditable from 'react-contenteditable';
import styles from '../../assets/styles/GratefulForAndExcitedAboutStyles.module.css';
import { replaceLineBreaks } from '../../utils/stringUtils';
import rootStore from '../../stores/RootStore';

const defaultTextInputContainerStyles =
	'w-[302px] min-h-91px pt-[15px] pr-[20px] pb-[10px] pl-[20px]';

const inputElementStyles = (isDarkMode: boolean) => ({
	borderBottom: isDarkMode ? '#575757' : '#1A1A1A',
	color: isDarkMode ? '#FFFFFF' : '#575757',
});

const InputGroup = (props: {
	title: string;
	labelText: string;
	labelStyle?: { [key: string]: string };
	inputClasses?: string;
	html?: string;
	inputDisabled?: boolean;
	handleChange: Function;
	inputStyle?: { [key: string]: string };
	isDarkMode?: boolean;
}) => {
	const {
		title,
		isDarkMode,
		inputClasses,
		html,
		inputDisabled,
		handleChange,
		inputStyle,
		labelText,
	} = props;

	return (
		<div
			className={`border-[0.5px] border-solid border-[${
				isDarkMode ? '#575757' : '#1A1A1A'
			}] ${defaultTextInputContainerStyles}`}
		>
			<label
				htmlFor={title}
				style={{ color: isDarkMode ? '#FFFFFF' : '#575757' }}
			>
				{labelText}
			</label>
			<ContentEditable
				id={title}
				className={inputClasses && inputClasses}
				html={html ? html : ''}
				disabled={inputDisabled}
				onChange={(e) => {
					handleChange(e.target.value);
				}}
				style={inputStyle && inputStyle}
			/>
		</div>
	);
};

const GratefulForAndExcitedAbout = () => {
	const excitedAboutValue = rootStore.planStore.plan?.excitedAbout;
	const gratefulForMorningValue = rootStore.planStore.plan?.gratefulForMorning;
	const isDarkMode = rootStore.uiStore.isDarkMode;

	return (
		<div className='mb-[14px] ml-[51px] flex items-center'>
			<InputGroup
				title='excitedForInput'
				labelText="TODAY I'M EXCITED ABOUT"
				inputClasses={styles.inputStyles}
				html={replaceLineBreaks(excitedAboutValue ? excitedAboutValue : '')}
				handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					rootStore.planStore.setUpdatePlan('excitedAbout', e.target.value)
				}
				inputDisabled={false}
				isDarkMode={isDarkMode}
				inputStyle={inputElementStyles(isDarkMode)}
			/>
			<InputGroup
				title='gratefulForMorningInput'
				labelText="I'M GRATEFUL FOR"
				inputClasses={styles.inputStyles}
				html={replaceLineBreaks(
					gratefulForMorningValue ? gratefulForMorningValue : ''
				)}
				handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					rootStore.planStore.setUpdatePlan(
						'gratefulForMorning',
						e.target.value
					)
				}
				inputDisabled={false}
				isDarkMode={isDarkMode}
				inputStyle={inputElementStyles(isDarkMode)}
			/>
		</div>
	);
};

export default observer(GratefulForAndExcitedAbout);