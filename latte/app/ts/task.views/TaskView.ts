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

                            let labelTitle = new LabelItem();
                            task.addBind('title',labelTitle, 'text');

                            let labelDescription = new LabelItem();
                            task.addBind('description', labelDescription, 'text');

                            listItem.setItem(0, labelTitle );
                            listItem.setItem(1, labelDescription );

                            listItem.tag = task;
                        });
                    }
                });
            }

            /**
             * Create new task
             */
            private newTask(){
                    let task = new Task();
                    task.idcategory = this.category.idcategory;
                    DataRecordDialogView.editRecord(task, () => {
                        this.loadTask();
                    }, strings.newTask );
            }

            /**
             * remove task
             */
            private delTask() {
                    let task = this.listView.selectedItem.tag as Task;
                    DialogView.confirmDelete( task.title, () => {
                        task.remove( () => {
                            this.loadTask();
                        });
                    });
                }

            /**
             * edit task
             */
            private editTask(){
                    let task = this.listView.selectedItem.tag as DataRecord;
                    DataRecordDialogView.editRecord( task, () => {
                            this.loadTask();
                        }, strings.edit);
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
                // this.raw.appendChild( this.materialButton.raw );
                this.view = this.listView;
            }

            /**
             * Raises the <c>selectedTask</c> event
             */
            onSelectedTaskChanged(){
                if(this._selectedTaskChanged){
                    this._selectedTaskChanged.raise();
                }
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

            /**
             * Back field for event
             */
            private _selectedTaskChanged: LatteEvent;

            /**
             * Gets an event raised when the value of the selectedTask property changes
             *
             * @returns {LatteEvent}
             */
            get selectedTaskChanged(): LatteEvent{
            if(!this._selectedTaskChanged){
                this._selectedTaskChanged = new LatteEvent(this);
            }
            return this._selectedTaskChanged;
        }
        //endregion

        //region Properties
            /**
             * Property field
             */
            private _selectedTask: Task = null;

            /**
             * Gets or sets task
             *
             * @returns {Task}
             */
            get selectedTask(): Task{
                return this._selectedTask;
            }

            /**
             * Gets or sets task
             *
             * @param {Task} value
             */
            set selectedTask(value: Task){

                // Check if value changed
                let changed: boolean = value !== this._selectedTask;

                // Set value
                this._selectedTask = value;

                // Trigger changed event
                if(changed){
                    this.onSelectedTaskChanged();
                }
            }
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
                    this._btnDelete = new ButtonItem( strings.deleteTask, IconItem.deleteIcon(), () => this.delTask() );
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
                    this._btnEdit = new ButtonItem(strings.editTask, IconItem.editIcon(), () => this.editTask() );
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
                    this._btnNew = new ButtonItem(strings.newTask, IconItem.newIcon(), () =>  this.newTask() );
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

                    let columHeaders = [
                        new ColumnHeader(strings.title),
                        new ColumnHeader(strings.description)
                    ];

                    this._listView.columnHeaders.addArray( columHeaders );
                    this._listView.selectedItemChanged.add(() => {
                        this.selectedTask = this.listView.selectedItem.tag as Task;
                    });
                }
                return this._listView;
            }

            /**
             * Field for materialButton property
             */
            private _materialButton: MaterialButton;

            /**
             * Gets the material button
             *
             * @returns {MaterialButton}
             */
            get materialButton(): MaterialButton {
                if (!this._materialButton) {
                    this._materialButton = new MaterialButton();
                    this._materialButton.click.add(() => this.newTask() );
                }
                return this._materialButton;
            }
        //endregion
    }

}