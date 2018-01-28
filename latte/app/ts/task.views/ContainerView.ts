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
            this.view = this.taskView;

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
                    this.taskView.category = this._categoryView.selectedCategory;
                });
            }
            return this._categoryView;
        }

        /**
         * Field for taskView property
         */
        private _taskView: TaskView;

        /**
         * Gets the task view
         *
         * @returns {TaskView}
         */
        get taskView(): TaskView {
            if (!this._taskView) {
                this._taskView = new TaskView();
            }
            return this._taskView;
        }

        //endregion

    }

}