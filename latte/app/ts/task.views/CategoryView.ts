module latte{

    /**
     *
     */
    export class CategoryView extends ToolbarView {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         * Constructor.
         */
        constructor() {
            super();
        }

        //region Private Methods
            /**
             * Load all categories.
             */
            private loadCategories(){
                Category.catalog().send( categories => {
                    this.listView.items.clear();

                    if( !!categories.length ){
                       categories.forEach( category => {
                          let listItem = new ListViewItem( this.listView );
                          listItem.setText(0, category.name );
                          listItem.tag = category;
                       });
                   }
                });
            }
        //endregion

        //region Methods
            /**
             * Override onLoad.
             */
            onLoad(){
                super.onLoad();
                this.toolbar.items.addArray([ this.btnNew ]);
                this.view = this.listView;

                this.loadCategories();
            }

            /**
             * Raises the <c>selectedCategory</c> event
             */
            onSelectedCategoryChanged(){
            if(this._selectedCategoryChanged){
                this._selectedCategoryChanged.raise();
            }
        }
        //endregion

        //region Events
            /**
             * Back field for event
             */
            private _selectedCategoryChanged: LatteEvent;

            /**
             * Gets an event raised when the value of the selectedCategory property changes
             *
             * @returns {LatteEvent}
             */
            get selectedCategoryChanged(): LatteEvent{
            if(!this._selectedCategoryChanged){
                this._selectedCategoryChanged = new LatteEvent(this);
            }
            return this._selectedCategoryChanged;
        }
        //endregion

        //region Properties
            /**
             * Property field
             */
            private _selectedCategory: Category = null;

            /**
             * Gets or sets selected category
             *
             * @returns {Category}
             */
            get selectedCategory(): Category{
                return this._selectedCategory;
            }

            /**
             * Gets or sets selected category
             *
             * @param {Category} value
             */
            set selectedCategory(value: Category){

                // Check if value changed
                let changed: boolean = value !== this._selectedCategory;

                // Set value
                this._selectedCategory = value;

                // Trigger changed event
                if(changed){
                    this.onSelectedCategoryChanged();
                }
            }
        //endregion

        //region Components
            /**
             * Field for btnNew property
             */
            private _btnNew: ButtonItem;

            /**
             * Gets the new button
             *
             * @returns {ButtonItem}
             */
            get btnNew(): ButtonItem {
                if (!this._btnNew) {
                    this._btnNew = new ButtonItem( strings.newCategory, IconItem.newIcon(), () => {
                        let category = new Category();
                        DataRecordDialogView.editRecord( category, () => {
                            this.loadCategories();
                        }, strings.addNew);
                    });
                }
                return this._btnNew;
            }

            /**
             * Field for listView property
             */
            private _listView: ListView;

            /**
             * Gets the list view
             *
             * @returns {ListView}
             */
            get listView(): ListView {
                if (!this._listView) {
                    this._listView = new ListView();

                    this._listView.columnHeaders.add(new ColumnHeader(strings.name));

                    this._listView.selectedItemChanged.add( () => {
                       this.selectedCategory = this._listView.selectedItem.tag as Category;
                    });
                }
                return this._listView;
            }
        //endregion

    }
}