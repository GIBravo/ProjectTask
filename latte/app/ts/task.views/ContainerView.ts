module latte {

    /**
     *
     */
    export class ContainerView extends SplitView {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         *
         */
        constructor() {
            super();
        }

        //region Private Methods
        //endregion

        //region Methods
        /**
         * Override.
         */
        onLoad(){
            super.onLoad();

            this.sideView = this.categoryView;
            this.view = this.taskDetailView;

        }
        //endregion

        //region Events
        //endregion

        //region Properties
        //endregion

        //region Components
        /**
         * Field for categoryView property
         */
        private _categoryView: CategoryView;

        /**
         * Gets the category view
         *
         * @returns {CategoryView}
         */
        get categoryView(): CategoryView {
            if (!this._categoryView) {
                this._categoryView = new CategoryView();

                this._categoryView.selectedCategoryChanged.add( () => {
                    this.taskDetailView.taskView.category = this._categoryView.selectedCategory;
                });
            }
            return this._categoryView;
        }

        /**
         * Field for taskDetailView property
         */
        private _taskDetailView: TaskDetailView;

        /**
         * Gets the task detail view
         *
         * @returns {TaskDetailView}
         */
        get taskDetailView(): TaskDetailView {
            if (!this._taskDetailView) {
                this._taskDetailView = new TaskDetailView();
            }
            return this._taskDetailView;
        }


        //endregion

    }

}