import Component from '@ember/component';

import { or } from '@ember-decorators/object/computed';
import { classNames } from '@ember-decorators/component';
import { argument } from '@ember-decorators/argument';
import { required } from '@ember-decorators/argument/validation';
import { type, arrayOf } from '@ember-decorators/argument/type';

import layout from './template';

/**
  Simple pagination controls component that is included to help you get started quickly.
  Yeti Tables yields a lot of pagination data, so you shouldn't have a problem
  creating your own pagination controls.

  At any rate, this component tries to be as flexible as possible. Some arguments
  are provided to customize how this component behaves.

  If you want to render these controls on the table footer, you probably want
  a footer row that always spans all rows. To do that you can use a `colspan` equal
  to the yielded `totalColumns` number. Example:

  ```hbs
  <tfoot>
    <tr>
      <td colspan={{table.totalColumns}}>
        <table.pagination/>
      </td>
    </tr>
  </tfoot>
  ```
*/
@classNames('yeti-table-pagination-controls')
export default class Pagination extends Component {
  layout = layout;

  @argument
  @required
  @type('object')
  paginationData;

  @argument
  @required
  @type('object')
  paginationActions;

  @argument
  @type('boolean')
  disabled;

  @or('paginationData.isFirstPage', 'disabled')
  shouldDisablePrevious;

  @or('paginationData.isLastPage', 'disabled')
  shouldDisableNext;

  /**
   * Array of page sizes to populate the page size `<select>`.
   * Particularly useful with an array helper, e.g `@pageSizes={{array 10 12 23 50 100}}`
   * Defaults to `[10, 15, 20, 25]`.
   */
  @argument
  @type(arrayOf('number'))
  pageSizes = [
    10, 15, 20, 25
  ];

  /**
   * Used to show/hide some textual information about the current page. Defaults to `true`.
   */
  @argument
  @type('boolean')
  showInfo = true;

  /**
   * Used to show/hide the page size selector. Defaults to `true`.
   */
  @argument
  @type('boolean')
  showPageSizeSelector = true;

  /**
   * Used to show/hide the previous and next page buttons. Defaults to `true`.
   */
  @argument
  @type('boolean')
  showButtons = true;

}
