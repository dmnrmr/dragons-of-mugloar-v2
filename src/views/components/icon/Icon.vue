<script>
const iconSizes = {
  sm: { width: '36px', height: '36px' },
  md: { width: '48px', height: '48px' },
  lg: { width: '60px', height: '60px' }
};
const iconFileNames = {
  'arrow-left': 'keyboard_arrow_left'
};

export default {
  name: 'DmIcon',
  functional: true,
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: false,
      default: 'md'
    }
  },
  render(_, { data, props }) {
    const icon = {
      name: iconFileNames[props.name],
      size: iconSizes[props.size]
    };

    return (
      <simple-svg
        class={data.staticClass}
        filepath={`./assets/icons/${icon.name}.svg`}
        width={icon.size.width}
        height={icon.size.height}
      />
    );
  }
};
</script>
