import sinon from 'sinon';
import { shallowMount } from '@vue/test-utils';
import ItemShop from './ItemShop.vue';
import items from '../../../../../test/fixtures/shopItems.json';

describe('Item shop component', () => {
  const sandbox = sinon.createSandbox();
  const wrapper = shallowMount(ItemShop, {
    propsData: {
      items,
      gold: 50
    }
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should render shop button if there are shop items', () => {
    const shopRef = wrapper.find('.shop-dropdown');

    expect(shopRef.exists()).to.be.true;
  });

  it('should not show dropdown content if it is closed', () => {
    const dropdownRef = wrapper.find('.shop-dropdown');

    expect(dropdownRef.classes()).not.to.contain('is-active');
  });

  it('should show dropdown content once dropdown is active', () => {
    const dropdownRef = wrapper.find('.shop-dropdown');
    const dropdownButtonRef = wrapper.find('.shop-dropdown__button');

    dropdownButtonRef.trigger('click');

    expect(dropdownRef.classes()).to.contain('is-active');
  });

  it('should render shop items', () => {
    const dropdownItemRefArray = wrapper.findAll('.shop-dropdown__menu-content-item');

    expect(dropdownItemRefArray).to.have.lengthOf(items.length);
  });

  it('should disable non-purchasable items', () => {
    const dropdownItemRefArray = wrapper.findAll('.shop-dropdown__menu-content-item');
    const purchasableItemRef = dropdownItemRefArray.at(0);
    const nonPurchasableItemRef = dropdownItemRefArray.at(1);

    expect(purchasableItemRef.attributes('disabled')).to.be.undefined;
    expect(nonPurchasableItemRef.attributes('disabled')).to.equal('disabled');
  });

  it('should emit event with item id when buying an item', () => {
    const dropdownItemRef = wrapper.find('.shop-dropdown__menu-content-item');

    dropdownItemRef.trigger('click');

    const [[event]] = wrapper.emitted()['item-buy'];
    const [item] = items;

    expect(event).to.equal(item.id);
  });

  it('should add/remove click event listenter on destroy', () => {
    sandbox.spy(document, 'addEventListener');
    sandbox.spy(document, 'removeEventListener');

    const localWrapper = shallowMount(ItemShop, {
      propsData: {
        items
      }
    });

    localWrapper.destroy();

    expect(document.addEventListener.getCall(0).args[0]).to.equal('click');
    expect(document.removeEventListener.getCall(0).args[0]).to.equal('click');
  });
});
