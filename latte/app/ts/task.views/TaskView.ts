module latte {

    /**
     *
     */
    export class TaskView extends ToolbarView {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         * Constructor of MainTaskView
         */
        constructor() {
            super();
        }

        //region Private Methods
        /**
         * Load all task.
         */
        private loadTask(){
            Task.byIdCategory(this.category.idcategory).send( tasks => {

                this.listView.items.clear();

                if( !!tasks.length ){
                    tasks.forEach( task => {

                        let listItem = new ListViewItem( this.listView );
                        listItem.setText(0, task.title );
                        listItem.setText(1, task.description );

                        listItem.tag = task;
                    });
                }
            });
        }
        //endregion

        //region Methods

        /**
         * Raises the <c>category</c> event
         */
        onCategoryChanged(){
            if(this._categoryChanged){
                this._categoryChanged.raise();
            }
            this.loadTask();
        }

        /**
         * Override
         */
        onLoad(){
            super.onLoad();
            this.toolbar.items.addArray([ this.btnNew, this.btnEdit, this.btnDelete ]);
            this.view = this.listView;
        }
        //endregion

        //region Events
        /**
         * Back field for event
         */
        private _categoryChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the category property changes
         *
         * @returns {LatteEvent}
         */
        get categoryChanged(): LatteEvent{
            if(!this._categoryChanged){
                this._categoryChanged = new LatteEvent(this);
            }
            return this._categoryChanged;
        }
        //endregion

        //region Properties
        //endregion

        //region Components

        /**
         * Field for btnDelete property
         */
        private _btnDelete: ButtonItem;

        /**
         * Gets the delete button
         *
         * @returns {ButtonItem}
         */
        get btnDelete(): ButtonItem {
            if (!this._btnDelete) {
                this._btnDelete = new ButtonItem(strings.deleteTask, IconItem.deleteIcon(), () => {
                    let task = this.listView.selectedItem.tag as Task;
                    DialogView.confirmDelete( task.title, () => {
                        task.remove( () => { this.loadTask(); });
                    });
                });
            }
            return this._btnDelete;
        }

        /**
         * Field for btnEdit property
         */
        private _btnEdit: ButtonItem;

        /**
         * Gets the edit button
         *
         * @returns {ButtonItem}
         */
        get btnEdit(): ButtonItem {
            if (!this._btnEdit) {
                this._btnEdit = new ButtonItem(strings.editTask, IconItem.editIcon(), () => {
                    let task = this.listView.selectedItem.tag as DataRecord;
                    DataRecordDialogView.editRecord( task, () => {
                        this.loadTask();
                    }, strings.edit);
                });
            }
            return this._btnEdit;
        }

        /**
         * Field for btnNew property
         */
        private _btnNew: ButtonItem;

        /**
         * Gets the new botton
         *
         * @returns {ButtonItem}
         */
        get btnNew(): ButtonItem {
            if (!this._btnNew) {
                this._btnNew = new ButtonItem(strings.newTask, IconItem.newIcon(), () => {
                    let task = new Task();

                    task.idcategory = this.category.idcategory;
                    DataRecordDialogView.editRecord(task, () => {
                        this.loadTask();
                    }, strings.newTask );
                });
            }
            return this._btnNew;
        }

        /**
         * Property field
         */
        private _category: Category = null;

        /**
         * Gets or sets category
         *
         * @returns {Category}
         */
        get category(): Category{
            return this._category;
        }

        /**
         * Gets or sets category
         *
         * @param {Category} value
         */
        set category(value: Category){

            // Check if value changed
            let changed: boolean = value !== this._category;

            // Set value
            this._category = value;

            // Trigger changed event
            if(changed){
                this.onCategoryChanged();
            }
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
                this._listView.columnHeaders.addArray([
                    new ColumnHeader(strings.title),
                    new ColumnHeader(strings.description)
                ]);
            }
            return this._listView;
        }
        //endregion

    }

}